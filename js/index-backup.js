let menu = { 
	"sandwiches": [
	    {
	        "id": 0,
	        "name": "roast beef",
	        "price": 12,
	        "img": "https://www.whichwich.com/img/menu/Bag-The-Wicked.jpg",
	        "count": 0
	    },
	    {
	        "id": 1,
	        "name": "turkey",
	        "price": 9,
	        "img": "https://www.whichwich.com/img/menu/Bag-The-Wicked.jpg",
	        "count": 0
	    },
	    {
	        "id": 2,
	        "name": "blt",
	        "price": 11,
	        "img": "https://www.whichwich.com/img/menu/Bag-The-Wicked.jpg",
	        "count": 0
	    },
	    {
	        "id": 3,
	        "name": "reuben",
	        "price": 9,
	        "img": "https://www.whichwich.com/img/menu/Bag-The-Wicked.jpg",
	        "count": 0
	    },
	    {
	        "id": 4,
	        "name": "cheesesteak",
	        "price": 13,
	        "img": "https://www.whichwich.com/img/menu/Bag-The-Wicked.jpg",
	        "count": 0
	    }
	],
	"sides": [
	    {
	        "id": 0,
	        "name": "fries",
	        "price": 6,
	        "img": "https://i.ytimg.com/vi/ETTyVQrUZt8/maxresdefault.jpg",
	        "count": 0
	    },
	    {
	        "id": 1,
	        "name": "rings",
	        "price": 4,
	        "img": "http://www.partyexcuses.com/images/uploads/holidayimages/bigstock-Onion-Rings-48385277.jpg",
	        "count": 0
	    },
	    {
	        "id": 2,
	        "name": "chips",
	        "price": 2,
	        "img": "http://www.3ders.org/images2015/pepsico-helps-lead-future-food-innovation-3d-printed-potato-chips-00002.jpg",
	        "count": 0
	    },
	    {
	        "id": 3,
	        "name": "tots",
	        "price": 5,
	        "img": "http://www.doghaus.com/dh-uploads/menu-detail/haus%20sides/Dog-Haus_Menu-Detail-tater-tots.jpg",
	        "count": 0
	    }
	] 
}

console.log(menu.sides[0])

// POPULATE MENU
let sandwiches = Array.from(menu.sandwiches);
document.querySelector('#sandwiches').innerHTML = sandwiches.map(sandwich => {
	return `<div class="item" data-index=${sandwich.id}>
				<div class="price">$ ${sandwich.price}</div>
				<img src="${sandwich.img}" alt="">
				<div class="qty">QTY: <span>${sandwich.count}</span></div>
				<div class="desc">${sandwich.name}</div>
			</div>`
}).join('');


let sides = Array.from(menu.sides);
document.querySelector('#sides').innerHTML = sides.map(side => {
	return `<div class="item" data-index=${side.id}>
				<div class="price">$ ${side.price}</div>
				<img src="${side.img}" alt="">
				<div class="qty">QTY: <span>${side.count}</span></div>
				<div class="desc">${side.name}</div>
			</div>`
}).join('');
// POPULATE MENU END

function addItem() {
	const price = this.querySelector('.price').innerHTML;
	const desc = this.querySelector('.desc').innerHTML;
	let qty = this.querySelector('.qty span').innerHTML;
	const index = this.dataset.index;
	let category = eval(this.parentNode.getAttribute('id'));

	category[index].count += 1;

	this.querySelector('.qty span').innerHTML = category[index].count;

	updateCheckout();
}
function updateCheckout() {
	const sideOrders = menu.sides.filter((side) => {
		if (side.count > 0) {
			return side;
		}
	});
	const sandwichOrders = menu.sandwiches.filter((sandwich) => {
		if (sandwich.count > 0) {
			return sandwich;
		}
	});
	
	let totalOrders = sandwichOrders.concat(sideOrders);

	document.querySelector('#checkout-wrap').innerHTML = totalOrders.map(order => {
		let orderPrice = order.count * order.price;
		return `<div class="item-desc">${order.name} (qty: ${order.count})</div><div class="item-price">${orderPrice}</div>`
	}).join('');

	let itemCost = Array.from(document.querySelectorAll('.item-price'));

	/*let totalCost = itemCost.reduce((total, item) => {
		return total + parseFloat(item.innerHTML);
	})*/
	let totalPrice = itemCost.map(function(item) {
		return parseFloat(item.innerHTML);
	}).reduce((total, item) => {
		return total + item;
	})

	document.querySelector('.total-price').innerHTML = `$${totalPrice}`;

}


const items = [].slice.call(document.querySelectorAll('.item'));
items.forEach(item => item.addEventListener('click', addItem));
