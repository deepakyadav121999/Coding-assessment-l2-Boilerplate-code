let containerDiv = document.querySelector('.container')

let api =async()=>{

    let response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448")
    let data = await response.json();
    let product = await data.product

    let price1 = product.price.split("").slice(1).join("")
    let price2 = product.compare_at_price.split("").slice(1).join("")
    const percent = (price1 / price2) * 100 
  let abc = parseInt(100-percent);
 let sizes =product.options[1].values; 
 let mainImg = 'http://surl.li/stttx'
console.log(sizes)
  containerDiv.innerHTML =`
  <div class="left">
            <div class="left-top">
              <img src="${mainImg}" id="mainimg"  alt="">
            </div>
            <div class="left-bottom">
            
               <img src="http://surl.li/stttj"  class="bottom-image selected"  alt="">
                <img src="http://surl.li/sttti" class="bottom-image" alt="">
               <img src="http://surl.li/sttto" class="bottom-image" alt="">
               <img src="http://surl.li/stttj" class="bottom-image"  alt="">
            </div>
            </div>
            
            
            
            <div class="right">
                <div class="vendor_title ">
                    <p class="product_vendor">${product.vendor}</p>
                    <h1 class="product_title">${product.title}</h1>
                </div>
           <div class="price-cnt">
            <div class="price-container">
                <p class="price">${product.price}</p>
                <p class="compared_price">${product.compare_at_price}</p>
            </div>
            <div>
                <p class="discount_percent">${abc}% Off</p>
            </div>
            
           </div>
           
           
            
            <div class="choose-color">
            <p class="popt">Choose a Color</p>
            <div class="colors">
                <div class="yellow selective-border">✔</div>
                <div class="green "></div>
                <div class="skyblue"></div>
                <div class="purple"></div>
            </div>
            </div>
            
            <div class="choose-size">
            <p class="pcsize">Choose a Size</p>
            <div class="size">
            
            </div>
            </div>

            <div class="quantity-cart">
                <div class="quantity">
                    <p class="minus">-</p>
                    <p class="number">1</p>
                    <p class="plus">+</p>
                </div>

                <div class="cart add-to-cart">
                    <button >Add to Cart</button>
                </div>
            </div>
            <div id="result" class ="hidden">
               
            </div>
            
            <div class="discription">
               
                <p class="discription_p">
                    The Embrace Sideboard is a stylish wear. With a top cloth designed to provide superior protection and look great, this storage solution is both functional and attractive. It fits seamlessly into any home decor, with clean lines and a timeless look. Crafted from premium materials for a combination of style, durability, and reliability.
                </p>
            </div>
          
            </div>
  `
  const colorDivs = containerDiv.querySelectorAll('.colors > div');

 
  colorDivs.forEach(div => {
      div.addEventListener('click', function () {
     
          colorDivs.forEach(d => {
              d.classList.remove('selective-border');
              d.innerHTML =''
          });

        
          this.classList.add('selective-border');
          this.innerHTML ='✔'
      });
  });

  const quantityNumber = containerDiv.querySelector('.quantity .number');
    const minusButton = containerDiv.querySelector('.quantity .minus');
    const plusButton = containerDiv.querySelector('.quantity .plus');
    const addToCartButton = containerDiv.querySelector('.add-to-cart');
    const resultDiv = containerDiv.querySelector('#result');
    const bottomImages = containerDiv.querySelectorAll('.left-bottom .bottom-image');
    const mainimg = document.getElementById('mainimg');
    const sizeDiv = document.querySelector('.size')

 
    minusButton.addEventListener('click', function() {
        let currentNumber = parseInt(quantityNumber.textContent);
        if (currentNumber > 1) {
            quantityNumber.textContent = currentNumber - 1;
        }
    });

  
    plusButton.addEventListener('click', function() {
        let currentNumber = parseInt(quantityNumber.textContent);
        quantityNumber.textContent = currentNumber + 1;
    });


    addToCartButton.addEventListener('click', function () {
        resultDiv.classList.remove('hidden');
        const selectedColor = containerDiv.querySelector('.colors .selective-border').classList[0];
     
        const selectedSize = containerDiv.querySelector('.size input:checked').value;
        
        const productName = product.title;

        
        resultDiv.textContent = `${productName} with Color ${selectedColor} and Size ${selectedSize} added to cart`;
       
    });

    bottomImages.forEach(image => {
        image.addEventListener('click', function () {
            mainImg = this.src;

            bottomImages.forEach(d => {
                d.classList.remove('selected');
               
            });
            
            this.classList.add('selected');
            mainimg.src = mainImg;
        });
    });


    let sizeHTML = '';

    sizes.forEach((item,index) => {
        const checkedAttribute = index === 0 ? 'checked' : '';
        sizeHTML += `
            <div>
                <input type="radio" name="size" value="${item}" ${checkedAttribute}>
                <label for="${item}">${item}</label>
            </div>
        `;
    });
    

    sizeDiv.innerHTML = sizeHTML;

}
api()
