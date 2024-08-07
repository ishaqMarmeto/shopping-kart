**START**

DEFINE HTML structure:
=====================
+ CREATE container for displaying products and cart

+ ADD buttons for toggling between product view and cart view

+ ADD sections for displaying products and cart items

+ INCLUDE sorting and filtering options in product section


DEFINE CSS styling:
----------------
+ STYLE body,
+ container,
+ buttons,
+ product cards,
+ cart items,
+ and responsive layout

DEFINE Variables
-----------------
+ INITIALIZE cart as empty array
+ INITIALIZE products as empty array

DEFINE Function fetchProducts:
-----------------------------
+ FETCH data from API 'https://fakestoreapi.com/products'
+ STORE fetched data in products array
+ CALL updateProductDisplay

DEFINE Function showProducts:
---------------------------
+ DISPLAY product section
+ HIDE cart section
+ CALL fetchProducts

DEFINE Function showCart
-----
+ DISPLAY cart section
+ HIDE product section
+ CALL updateCartDisplay

DEFINE Function addToCart(productId):
--------
+ FIND product by productId in products array
    - IF product exists in cart
        - INCREMENT its quantity
    - ELSE
        - ADD product to cart with quantity 1
    - CALL updateCartDisplay
    - CALL updateCartCount

DEFINE Function removeFromCart(productId):
----
+REMOVE product from cart by productId
+ CALL updateCartDisplay
+ CALL updateCartCount

DEFINE Function increaseQuantity(productId):
--------
+ FIND product by productId in cart
+ INCREMENT product quantity
+ CALL updateCartDisplay

DEFINE Function decreaseQuantity(productId):
-------
+ FIND product by productId in cart
+ DECREMENT product quantity
    - IF quantity is 0
        - REMOVE product from cart
    - CALL updateCartDisplay

DEFINE Function totalPrice:
---------
+ CALCULATE total price of all cart items

DEFINE Function averagePrice:
-------
+ CALCULATE average price of all cart items

DEFINE Function sortProducts(order):
---
+ SORT products array based on price in ascending or descending order
    - CALL updateProductDisplay

DEFINE Function filterProducts:
-----
+ GET maximum price from filter input
+ FILTER products below maximum price
+ CALL updateProductDisplay

DEFINE Function clearCart
-----------
+ CLEAR cart array
+ CALL updateCartDisplay
+ CALL updateCartCount
+ DISPLAY alert "Your cart is empty"

DEFINE Function updateProductDisplay(filteredProducts = products)
-------
+ DISPLAY products in product-list div

DEFINE Function updateCartDisplay:
-----
+ DISPLAY cart items, total price, and average price in cart-items div

DEFINE Function updateCartCount:
---------
+ DISPLAY count of unique items in cart button

+ CALL showProducts on page load to initialize display

**END**
