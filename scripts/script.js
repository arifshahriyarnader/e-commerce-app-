const products = [
    {
      id: 1,
      name: 'Gaming Laptop',
      price: 1500,
      image: 'https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-gaming-3/ideapad-gaming-3-001-228x228.jpg',
      categories: ['Laptops', 'Gaming'],
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 50,
      image: 'https://www.startech.com.bd/image/cache/catalog/mouse/zoook/clique/clique-01-500x500.jpg',
      categories: ['Accessories', 'Peripherals'],
    },
    {
      id: 3,
      name: 'Gaming Keyboard',
      price: 100,
      image: 'https://www.startech.com.bd/image/cache/catalog/keyboard/meetion/mt-k9320/mt-k9320-01-500x500.jpg',
      categories: ['Accessories', 'Peripherals'],
    },
    {
      id: 4,
      name: 'External Hard Drive',
      price: 120,
      image: 'https://www.startech.com.bd/image/cache/catalog/portable-hdd%20/lacie/10tb-d2-professional/lacie-10tb-d2-professional-01-500x500.jpg',
      categories: ['Storage', 'Accessories'],
    },
    {
      id: 5,
      name: 'Graphics Card',
      price: 500,
      image: 'https://www.startech.com.bd/image/cache/catalog/graphics-card/colorful/geforce-gt710-2gd3/geforce-gt710-2gd3-1-500x500.jpg',
      categories: ['Components', 'Gaming'],
    },
    {
      id: 6,
      name: 'Portable SSD',
      price: 200,
      image: 'https://www.startech.com.bd/image/cache/catalog/ssd/colorful/sl500/sl500-500x500.JPG',
      categories: ['Storage', 'Accessories'],
    },
    {
      id: 7,
      name: 'Gaming Monitor',
      price: 300,
      image: 'https://www.startech.com.bd/image/cache/catalog/monitor/gigabyte/gs32q/gs32q-01-500x500.webp',
      categories: ['Monitors', 'Gaming'],
    },
    {
      id: 8,
      name: 'Wireless Headphone',
      price: 500,
      image: 'https://www.startech.com.bd/image/cache/catalog/headphone/wiwu/elite/elite-01-500x500.webp',
      categories: ['Accessories', 'Peripherals'],
    },
    {
      id: 9,
      name: 'All-in-One Printer',
      price: 150,
      image: 'https://www.startech.com.bd/image/cache/catalog/printer/g-printer/gp-c80180ii/gp-c80180ii-01-500x500.webp',
      categories: ['Peripherals', 'Printers'],
    },
  ];

  let cart=[];
  let selectedCategory=null;

  const isProductExistInCart =(productId) =>{
    const productIndex= cart.findIndex((product) =>{
      if(product.id === productId){
        return true;
      }
      else{
        return false;
      }
    });
    if(productIndex === -1){
      return false;
    }
    return true;
  }

  const getProductImage=(product) =>{
    const productImage=document.createElement('img');
    productImage.src=product.image;
    productImage.alt=product.name
    productImage.classList.add('w-full', 'mb-4')
    return productImage
  }
  const getProductName =(product) =>{
    const productName=document.createElement('h2');
    productName.textContent=product.name;
    productName.classList.add('text-lg', 'font-semibold');
    return productName;
  }
  const getProductPrice=(product) =>{
    const productPrice=document.createElement('h3');
    productPrice.textContent=`$${product.price}`;
    return productPrice;
  }
  function removeProductFromCart(productId){
    const productIndex=cart.findIndex(() =>{
      return products.id === productId
    })
    if(productIndex === -1){
      alert("Product is not in the cart");
      return;
    }
    cart.splice(productIndex,1);
    getrenderCarts()
  }
  const getTotalPriceFromCart=() =>{
    const totalPrice=cart.reduce((acc, CurrentProduct) =>{
      return acc + CurrentProduct.price;
    }, 0)
    return totalPrice;
  }
  
  const getrenderCarts=() =>{
    const cartItemLists=document.getElementById("cart-items")
    cartItemLists.innerHTML='';
    cart.forEach((product) =>{
      //create cart item element
      const cartItemElement=document.createElement('li');
      cartItemElement.innerText=`${product.name} - $${product.price} * ${1}`
      //remove button
      const removeBtn=document.createElement("button");
      removeBtn.innerText="Remove"
      removeBtn.classList.add("text-red-500", "ml-2")
      removeBtn.addEventListener("click", () =>{
        removeProductFromCart(products.id);
      })
      cartItemElement.appendChild(removeBtn);
      //append cart item
      cartItemLists.append(cartItemElement);
    })
  const totalPriceElement=document.getElementById('total-price');
  totalPriceElement.innerHTML='';
  if(cart.length>0){
    const totalPrice=getTotalPriceFromCart()
    totalPriceElement.innerText=`Total = $${totalPrice}`;
  }
  }
  const getAddToCartButton=(product)=>{
    const addCartButton=document.createElement('button');
    addCartButton.textContent='Add to Cart';
    addCartButton.classList.add(
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-2',
      'rounded',
      'mt-2'
    )
    addCartButton.addEventListener('click', function(){
      if(isProductExistInCart(product.id)){
        alert('This product is already in the cart')
        return;
      }
      cart.push(product);
      //console.log(cart)
      getrenderCarts()
    })
    
    return addCartButton;
  }

  const getproductCard=(product)  =>{
    const card=document.createElement('div');
    card.classList.add('bg-white', 'p-4', 'rounded', 'shadow');

    const productImage=getProductImage(product);
    card.appendChild(productImage);
    const productName=getProductName(product);
    card.appendChild(productName);
    const productPrice=getProductPrice(product);
    card.appendChild(productPrice); 
    const addToCartButton=getAddToCartButton(product);
    card.appendChild(addToCartButton);
    return card;
  }

const renderProducts =() =>{
  const productListContainer=document.getElementById("product-list");
  productListContainer.innerHTML='';
  let categoriesProducts=products;
  if(selectedCategory){
    categoriesProducts=products.filter((product) =>{
      return product.categories.includes(selectedCategory);
    })
  }
  categoriesProducts.forEach((product) =>{
    const productCard=getproductCard(product);
    productListContainer.appendChild(productCard);

  })
  console.log(categoriesProducts);
}
const getProductCategories=() =>{
  const productCategories= products.map((product) =>{
    return product.categories;
  })
const categoryFlatList=productCategories.flat();
const uniqueCategories=new  Set(categoryFlatList);
return [...uniqueCategories];
}

const renderCategories=() =>{
  const categoryContainer =document.getElementById('category-filters');
  categoryContainer.innerHTML='';
  const categories=getProductCategories()
  categories.forEach((category) =>{
    const categoryBtn = document.createElement('button');
    categoryBtn.innerText=category;
    categoryBtn.classList.add(
      'bg-gray-200',
      'hover:bg-gray-300',
      'text-gray-800',
      'font-semibold',
      'py-2',
      'px-2',
      'rounded',
      'mr-2'
    )
    categoryBtn.addEventListener('click',() =>{
      selectedCategory=category;
      renderProducts()
    })
    categoryContainer.appendChild(categoryBtn);
  })
}

renderProducts()
renderCategories()

const clearFilterBtn=document.getElementById('clear-filters-btn');
clearFilterBtn.addEventListener('click', function(){
  selectedCategory=null;
  renderProducts();
})
const checkOutBtn=document.getElementById('checkout-btn');
checkOutBtn.addEventListener('click', function(){
  cart=[];
  getrenderCarts();
})