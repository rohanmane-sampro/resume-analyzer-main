# Phone Number Display Issue - Diagnosis

## Issue Summary
Phone number is extracted from resume but not displaying in the form.

## Root Cause Analysis

### 1. Data Flow
1. **Resume Upload** → `FileUploadPage.jsx` calls `parseResume(file)`
2. **Parsing** → `ResumeParser.js` extracts phone using `extractPhone(text)` (line 60-64)
3. **Navigation** → Data passed via `navigate('/GetInfo', { state: { jsonData: result.data } })`
4. **Form Loading** → `GetInfo.jsx` receives data as `UserjsonData = location.state?.jsonData`

### 2. Phone Extraction Logic (ResumeParser.js)
```javascript
function extractPhone(text) {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g;
  const matches = text.match(phoneRegex);
  return matches ? matches[0] : '';
}
```

**Location in code:** Line 60-64
**Used in:** Line 451 for local regex parsing, Line 354 for AI parsing

### 3. Form Display Logic (GetInfo.jsx)
The phone number input field (lines 573-590) uses:
```javascript
value={isExampleProcessing ? ExampleJsonData.contactInfo.phoneNumber : formData.contactInfo.phoneNumber}
```

### 4. Data Loading (GetInfo.jsx, lines 251-276)
```javascript
useEffect(() => {
  if (hasLoadedDataRef.current) return;
  
  const stateSelectedTemplate = location.state?.selectedTemplate;
  
  if (UserjsonData || stateSelectedTemplate) {
    hasLoadedDataRef.current = true;
    
    let newFormData = { ...formData };
    
    if (UserjsonData) {
      newFormData = { ...UserjsonData };  // ← Phone number should be here
      setIsExampleProcessing(false);
      setCompletedSteps(new Set([1, 2, 3, 4, 5, 6, 7]));
    }
    
    if (stateSelectedTemplate) {
      newFormData.selectedTemplate = String(stateSelectedTemplate);
    }
    
    setFormData(newFormData);  // ← Updates form state
    setCurrentStep(0);
  }
}, [UserjsonData, location.state]);
```

## Potential Issues

### Issue #1: useEffect Dependencies
The useEffect has `[UserjsonData, location.state]` as dependencies. This might cause issues if:
- The component re-renders before data is loaded
- The `formData` initial state is being used instead of loaded data

### Issue #2: Phone Number Format Validation
The form has validation (lines 580-589) that requires exactly 10 digits:
```javascript
onBlur={(e) => {
  const value = e.target.value;
  if (!/^\d{10}$/.test(value)) {
    toast.error("Phone number must be of 10 digits", { duration: 3000 });
    setIsInvalidMob(true);
  }
}}
```

**Problem:** The extracted phone might have formatting (e.g., "+1 (555) 123-4567") that doesn't match the 10-digit requirement.

### Issue #3: Input Type
The phone input uses `type="number"` (line 574), which can cause issues with:
- Leading zeros
- Formatted phone numbers with symbols
- International phone numbers with "+"

## Debugging Steps

1. **Check Console Logs**
   - Open browser DevTools (F12)
   - Look for "Parsed data (Local):" or "AI Parsing successful:" logs
   - Verify `contactInfo.phoneNumber` has a value

2. **Check Navigation State**
   - In GetInfo.jsx, add console.log after line 23:
   ```javascript
   console.log('UserjsonData:', UserjsonData);
   console.log('Phone from import:', UserjsonData?.contactInfo?.phoneNumber);
   ```

3. **Check Form State**
   - Add console.log in the useEffect (after line 273):
   ```javascript
   console.log('Form data after loading:', newFormData.contactInfo.phoneNumber);
   ```

## Recommended Fixes

### Fix #1: Clean Phone Number Format
In `ResumeParser.js`, modify the `extractPhone` function to return only digits:

```javascript
function extractPhone(text) {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g;
  const matches = text.match(phoneRegex);
  if (matches) {
    // Extract only digits from the matched phone number
    const cleaned = matches[0].replace(/\D/g, '');
    // Return last 10 digits (for international numbers)
    return cleaned.slice(-10);
  }
  return '';
}
```

### Fix #2: Update Input Type
Change the phone input from `type="number"` to `type="tel"` in GetInfo.jsx (line 574):

```javascript
<input
  type="tel"  // Changed from "number"
  placeholder="96XXXXXXXX"
  // ... rest of props
/>
```

### Fix #3: Add Debug Logging
Temporarily add logging to track the data flow:

In `FileUploadPage.jsx` (after line 86):
```javascript
console.log('Parsed resume data:', result.data);
console.log('Phone number extracted:', result.data.contactInfo.phoneNumber);
```

In `GetInfo.jsx` (after line 273):
```javascript
console.log('Loading imported data:', newFormData);
console.log('Phone number in form:', newFormData.contactInfo.phoneNumber);
```

## Next Steps

1. Apply Fix #1 to clean the phone number format
2. Apply Fix #2 to change input type
3. Test with a sample resume
4. Check browser console for any errors or warnings
5. Verify the phone number displays correctly in the form

## Files to Modify

1. `backend/src/services/ai_service.py` - If AI parsing is being used
2. `frontend/src/components/ResumeParser.js` - Phone extraction logic
3. `frontend/src/components/GetInfo.jsx` - Form input type and validation
