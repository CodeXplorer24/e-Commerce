const registerFormControls = [
{
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    componentType: 'input',
    type: 'text'
},
{
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your  email',
    componentType: 'input',
    type: 'text'
},
{
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password'
}
]

const loginFormControls = [
    {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your  email',
    componentType: 'input',
    type: 'text'
},
{
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password'
}
]

const addProductFormElements = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
      { id: "electronics", label: "Electronics"}
    ],
  },
  // {
  //   label: "Brand",
  //   name: "brand",
  //   componentType: "select",
  //   options: [
  //     { id: "nike", label: "Nike" },
  //     { id: "adidas", label: "Adidas" },
  //     { id: "puma", label: "Puma" },
  //     { id: "levi", label: "Levi's" },
  //     { id: "zara", label: "Zara" },
  //     { id: "h&m", label: "H&M" },
  //   ],
  // },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Stock",
    name: "stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export {
    loginFormControls,
    registerFormControls,
    addProductFormElements
}