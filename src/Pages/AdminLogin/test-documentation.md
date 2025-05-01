# AdminLogin Module Test Documentation

## Components Overview

- AdminLogin (Main login form)
- ForgotPassword
- OTP Verification
- ResetPassword
- SignUp

## 1. AdminLogin Component

### Input Validation Tests

#### Email Field

- **Required Field**

  - Test empty submission
  - Verify error message: "Email is required"

- **Format Validation**

  - Test invalid email formats
  - Verify error message: "Please enter a valid email"

- **Length Validation**

  - Minimum: 10 characters
  - Maximum: 50 characters
  - Verify respective error messages

- **Character Restrictions**
  - No spaces allowed
  - No special characters except @ and .
  - Verify error message: "Special characters and spaces are not allowed"

#### Password Field

- **Required Field**

  - Test empty submission
  - Verify error message: "Password is required"

- **Length Validation**

  - Minimum: 6 characters
  - Maximum: 20 characters
  - Verify error messages

- **Character Restrictions**
  - No spaces allowed
  - Verify error message: "Spaces are not allowed in password"

### UI/UX Tests

#### Password Visibility Toggle

- Test show/hide password functionality
- Verify eye icon changes appropriately
- Verify password field type changes between "password" and "text"

#### Form Reset

- Verify form clears when modal closes
- Verify error states reset when modal closes

#### Navigation

- Verify successful login redirects to '/home'
- Verify "Sign up" link opens SignUp modal
- Verify "Forgot Password" link opens ForgotPassword modal

## 2. ForgotPassword Component

### Email Validation Tests

- **Required Field**

  - Test empty submission
  - Verify error message

- **Format Validation**

  - Test invalid email formats
  - Verify error messages

- **Length Validation**
  - Maximum: 50 characters
  - Verify error message

### Flow Tests

- Verify successful submission opens OTP modal
- Verify email is passed correctly to OTP component

## 3. OTP Component

### Input Validation Tests

- **OTP Field Tests**
  - Verify 4-digit input
  - Test numeric-only input
  - Test auto-focus on next input
  - Test backspace behavior

### Timer Tests

- Verify 60-second countdown
- Test resend OTP functionality
- Verify timer reset on resend

### Clipboard Tests

- Test paste functionality for 4-digit OTP
- Verify invalid paste handling

## 4. ResetPassword Component

### Password Validation Tests

#### New Password

- **Required Field**

  - Test empty submission
  - Verify error message

- **Length Validation**
  - Minimum: 8 characters
  - Maximum: 20 characters
  - Verify error messages

#### Confirm Password

- **Match Validation**
  - Test password mismatch
  - Verify error message: "Passwords do not match"

### UI/UX Tests

- Test password visibility toggles
- Verify form reset on modal close
- Verify successful reset opens login modal

## 5. SignUp Component

### Input Validation Tests

#### Name Field

- **Required Field**
- **Character Restrictions**
  - Letters only
  - No spaces/numbers/special characters
- **Length Validation**
  - Maximum: 50 characters

#### Email Field

- Similar to AdminLogin email validation

#### Phone Field

- **Format Validation**
  - 10 digits only
  - Must start with 6-9
- **Required Field**

#### Password Fields

- Similar to ResetPassword validation
- Match validation for confirm password

### UI/UX Tests

- Test password visibility toggles
- Verify form reset on modal close
- Verify navigation to login modal

## General Tests

### Modal Behavior

- Test modal open/close functionality
- Verify backdrop click behavior
- Test escape key functionality

### Responsive Design

- Test on various screen sizes
- Verify form layout adaptation
- Check input field responsiveness

### Error Handling

- Verify error message display
- Test error message clearing
- Verify form validation timing

### API Integration

- Test API endpoint connections
- Verify token handling
- Test error responses
- Verify role-based navigation

### Accessibility

- Test keyboard navigation
- Verify ARIA attributes
- Test screen reader compatibility
- Check color contrast ratios

### Performance

- Test form submission speed
- Verify modal transition smoothness
- Check input field responsiveness

### Security

- Test XSS prevention
- Verify password handling
- Test input sanitization
- Check CSRF protection
