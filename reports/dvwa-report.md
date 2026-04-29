# DVWA Penetration Testing Report

## 🔍 Target Information

* Application: DVWA (Damn Vulnerable Web Application)
* Environment: Localhost
* Security Level: LOW

---

## 🧪 Testing Methodology

1. Reconnaissance (Nmap, ARP Scan)
2. Traffic Analysis (Wireshark)
3. Request Interception (Burp Suite)
4. Vulnerability Exploitation (DVWA)

---

## 🚨 Vulnerability Findings

### 1. SQL Injection (Critical)

**Description:**
The login form is vulnerable to SQL Injection due to improper input validation.

**Payload Used:**

```
1' OR '1'=1
```

**Result:**
Authentication bypass achieved without valid credentials.

**Impact:**

* Unauthorized access
* Full database exposure

---

### 2. Reflected XSS (High)

**Description:**
User input is reflected without sanitization, allowing script execution.

**Payload Used:**

```
<script>document.body.innerHTML="Hacked"</script>
```

**Result:**
JavaScript executed in browser.

**Impact:**

* Session hijacking
* Credential theft

---

### 3. Command Injection (Critical)

**Description:**
Application executes system commands using user input.

**Payload Used:**

```
127.0.0.1; whoami
```

**Result:**
System command executed successfully.

**Impact:**

* Remote code execution
* Server compromise

---

### 4. Local File Inclusion (High)

**Description:**
Application includes files without validation.

**Payload Used:**

```
../../../../etc/passwd
```

**Result:**
Sensitive system file accessed.

**Impact:**

* Information disclosure
* Credential leakage

---

## 📊 Summary

| Vulnerability     | Severity |
| ----------------- | -------- |
| SQL Injection     | Critical |
| XSS               | High     |
| Command Injection | Critical |
| File Inclusion    | High     |

---

## 🛡️ Recommendations

* Validate and sanitize all user inputs
* Use prepared statements (SQL)
* Implement output encoding (XSS)
* Disable dangerous system functions
* Restrict file access using whitelisting

---

## 🎯 Conclusion

This assessment demonstrates multiple critical vulnerabilities due to lack of input validation and secure coding practices. Proper security controls must be implemented to prevent exploitation.
