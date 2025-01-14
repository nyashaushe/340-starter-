/* Mobile-first CSS */

/* General styles */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

/* Header styles */
header {
    padding: 10px;
}

#tools {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

nav {
    width: 100%;
}

nav ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

nav ul li {
    margin-bottom: 5px;
}

/* Main content */
main {
    padding: 15px;
}

/* Form elements */
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input, textarea, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
}

/* Images */
img {
    max-width: 100%;
    height: auto;
}

/* Grid items */
.grid-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

/* Footer */
footer {
    padding: 10px;
    text-align: center;
}

/* Utility classes */
.hidden {
    display: none;
}

.visible {
    display: block;
}