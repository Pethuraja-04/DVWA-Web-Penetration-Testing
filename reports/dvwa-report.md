# DVWA Penetration Testing Report

## Target

DVWA (localhost)

## Findings

### SQL Injection

* Vulnerable parameter: User ID
* Payload used: `' OR '1'='1`
* Impact: Full database access

### XSS

* Type: Reflected & Stored
* Payload: `<script>alert(1)</script>`
* Impact: Client-side code execution

### Brute Force

* No rate limiting
* Weak password policy

## Conclusion

The application is highly vulnerable to common web attacks due to lack of input validation and security controls.
