## Crop Compass
<div align="center">
  <img 
    src="screenshots/logo.png"
    alt="logo" 
    width="150px" 
    height="150px" 
    style="border-radius: 10px; display: block;"
  >
</div>

### Overview

Crop Compass is a smart agriculture web platform designed to support farmers and verified agricultural sellers in Nepal. It combines crop recommendation, fertilizer guidance, soil data analysis, and a verified marketplace for seeds and fertilizers.

---
### Objective

To build a unified agricultural support platform that helps farmers make data-driven decisions while also providing a trusted marketplace for agricultural products in Nepal.

---

### Key Features

#### 1. Verified Agricultural Marketplace

A web-based shop where users can buy and sell seeds and fertilizers.

* Only verified sellers can list products
* Quality control system for seller approval
* Product browsing, cart system, and order management
* Secure checkout using eSewa payment integration

---

#### 2. Fertilizer Recommendation System

A smart advisory tool for nutrient management.

* Input: crop type + soil NPK values
* Output: fertilizer adjustment recommendations (increase/decrease N, P, K)
* Helps optimize yield and reduce over-fertilization

---

#### 3. Crop Recommendation System

Data-driven crop suggestion engine based on environmental and soil conditions.

* Uses soil data from NARC (Nepal Agricultural Research Council)
* Uses temperature and rainfall data from NASA datasets
* Input parameters: soil nutrients, pH, temperature, rainfall
* Output: most suitable crops for given conditions in Nepal

---

### Tech Stack

| Layer              | Technologies |
|--------------------|--------------|
| Frontend           | React, HTML, Tailwind CSS |
| Backend            | Python, Flask |
| Database           | MongoDB |
| Payment Gateway    | eSewa |
| Data Sources       | NARC Nepal soil data, NASA climate datasets |

---

### Future Improvements

* Mobile application version
* Real-time weather integration
* AI-based yield prediction
* Multi-language support for farmers

---

## Screenshots

### Shop
1. Home
![home](screenshots/home.jpg)
2. About
![about](screenshots/about.jpg)
3. Contact
![contact](screenshots/contact.jpg)
4. Features
![features](screenshots/features.jpg)
5. Signup
![signup](screenshots/signup.jpg)
6. Login
![login](screenshots/buyerlogin.jpg)
7. Shop
![shop](screenshots/shop.jpg)
8. Seller Dashboard
![sellerdashboard](screenshots/sellerdashboard.jpg)
9. Product
![product](screenshots/productdetails.jpg)
10. Add product
![addproduct](screenshots/addproduct.jpg)
11. Edit product
![editproduct](screenshots/editproduct.jpg)
12. Cart
![cart](screenshots/cart.jpg)
13. Payment
![payment](screenshots/paymentdetails.jpg)
14. Esewa
![esewa](screenshots/esewapayment.jpg)

### Crop recommendation and fertilizer recommendation (Machine Learning)
1. Crop recommendation
![croprecommendation](screenshots/croprecommendationsystem.jpg)
2. Fertilizer recommendation
![fertilizerrecommendation](screenshots/fertilizerfill.jpg)
![fertilizerresult](screenshots/fertilizerresult.jpg)