# 🔐 DVWA Web Application Penetration Testing Lab

## 📌 Overview

This project demonstrates hands-on web application penetration testing using DVWA (Damn Vulnerable Web Application). The goal is to identify and exploit common web vulnerabilities.

---

## 🛠️ Tools Used

* Burp Suite
* Nmap
* Wireshark
* Browser DevTools

---

## ⚙️ Environment Setup

* Ubuntu (LAMP Stack)
* Apache, MySQL, PHP
* DVWA configured locally

---

## 🚨 Vulnerabilities Tested

### 1. SQL Injection

* Payload: `' OR '1'='1`
* Result: Authentication bypass and data extraction

### 2. Cross-Site Scripting (XSS)

* Reflected and Stored XSS performed
* JavaScript execution in browser

### 3. Brute Force Attack

* Tested weak login authentication
* Observed lack of rate limiting

---

## 🧠 Key Learnings

* Input validation issues lead to major vulnerabilities
* Importance of secure authentication mechanisms
* Practical understanding of OWASP Top 10 vulnerabilities

---

## 📸 Screenshots

(Add screenshots in /screenshots folder)

---

## ⚠️ Disclaimer

This project is for educational purposes only. All testing was performed in a controlled environment.
