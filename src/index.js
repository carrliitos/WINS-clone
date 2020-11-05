courses = [
	{
		id: 0,
		subject: "CompSci", 
		courseid: 172, 
		title: "Intro to Java",
		credits: 3, 
		category: "core" 
	},
	{
		id: 1,
		subject: "CompSci", 
		courseid: 174, 
		title: "Intro to C++", 
		credits: 3, 
		category: "core"
	},
	{
		id: 2,
		subject: "CompSci", 
		courseid: 215, 
		title: "Discrete Structures", 
		credits: 3, 
		category: "unique"
	},
	{ 
		id: 3,
		subject: "CompSci", 
		courseid: 220, 
		title: "Intermediate Java", 
		credits: 3, 
		category: "core"
	},
	{ 
		id: 4,
		subject: "CompSci", 
		courseid: 222, 
		title: "Intermediate C++", 
		credits: 3, 
		category: "core"
	},
	{ 
		id: 5,
		subject: "CompSci", 
		courseid: 223, 
		title: "Data Structures", 
		credits: 3, 
		category: "core"
	},
	{ 
		id: 6,
		subject: "CompSci", 
		courseid: 271, 
		title: "Assembly Programming", 
		credits: 3, 
		category: "core"
	},
	{ 
		id: 7,
		subject: "CompSci", 
		courseid: 310, 
		title: "Intermediate Data Science", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 8,
		subject: "CompSci", 
		courseid: 332, 
		title: "Intro to AI", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 9,
		subject: "CompSci", 
		courseid: 366, 
		title: "Database Management Systems", 
		credits: 3, 
		category: "core"
	},
	{ 
		id: 10,
		subject: "CompSci", 
		courseid: 381, 
		title: "Javascript", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 11,
		subject: "CompSci", 
		courseid: 382, 
		title: "Server-side Scripting", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 12,
		subject: "CompSci", 
		courseid: 433, 
		title: "Theory of Algorithms", 
		credits: 3, 
		category: "core"
	},
	{ 
		id: 13,
		subject: "CompSci", 
		courseid: 476, 
		title: "Software Engineering", 
		credits: 3, 
		category: "core"
	},
	{ 
		id: 14,
		subject: "CompSci", 
		courseid: 481, 
		title: "Unix System Administration", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 15,
		subject: "CompSci", 
		courseid: 482, 
		title: "Advanced Web Application Development ", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 16,
		subject: "Math", 
		courseid: 250, 
		title: "Business Calculus", 
		credits: 5, 
		category: "unique"
	},
	{ 
		id: 17,
		subject: "Math", 
		courseid: 253, 
		title: "Calculus I", 
		credits: 5, 
		category: "unique"
	},
	{ 
		id: 18,
		subject: "Math", 
		courseid: 280, 
		title: "Discrete Mathematics", 
		credits: 3, 
		category: "unique"
	},
	{ 
		id: 19,
		subject: "Math", 
		courseid: 342, 
		title: "Statistics", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 20,
		subject: "Math", 
		courseid: 347, 
		title: "Scientific Computing", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 21,
		subject: "Math", 
		courseid: 355, 
		title: "Linear Algebra", 
		credits: 3, 
		category: "elective"
	},
	{ 
		id: 22,
		subject: "Math", 
		courseid: 471, 
		title: "Numerical Analysis", 
		credits: 3, 
		category: "elective"
	},
]

let selectedItems = [];
displayCoursesList();

function displayCoursesList() {
	let courseInfo = "";
	const category = document.querySelector('#category').value;

	if(category === "All") {
		courses.forEach(course => courseInfo += createCourseInfo(course));
	}else if(category === "coreCourses") {
		courses.filter(course => course.category === "core").forEach(core => courseInfo += createCourseInfo(core));
	}else if(category === "electiveCourses") {
		courses.filter(course => course.category === "elective").forEach(elective => courseInfo += createCourseInfo(elective));
	}else if(category === "uniqueCourses") {
		courses.filter(course => course.category === "unique").forEach(unique => courseInfo += createCourseInfo(unique));
	}else if(category === "above300") {
		courses.filter(course => course.courseid >= 300).forEach(above => courseInfo += createCourseInfo(above));
	}else {
		courses.forEach(course => courseInfo += createCourseInfo(course));
	}

	document.querySelector('#courseList').innerHTML = courseInfo;
}

function createCourseInfo(course) {
	let tableRow = "";
	tableRow += `<tr><td>${course.subject}</td>
				<td>${course.courseid}</td>
				<td>${course.title}</td>
				<td>${course.credits}</td>
				<td>${course.category}</td>
				<td><button type=\"button\" class=\"btn btn-primary\" class=\"add-btn\" onclick=\"addItemToCart(${course.id})\">Add to cart</button></td>
				</tr>`;
	return tableRow;
}

function addItemToCart(index) {
	selectedItems.push(index);
	for(let i = 0; i < selectedItems.length; i++) {
		if(selectedItems[i] == selectedItems[i + 1]) {
			alert("Course is already added to shopping cart.\nPlease select a different course to update your cart.");
			selectedItems.pop(i + 1);
		}else {
			displayShoppingCart();
			displayResult();
		}
	}
}

function displayShoppingCart() {
	const max = selectedItems.length;
	if(max == 0) {
		document.querySelector(".cartSummary").innerHTML = "Shopping cart is empty";
		document.querySelector("#totalCredits").innerHTML = "";
		document.querySelector(".cartItems").innerHTML = "";
		resetCalculations();
		document.querySelector("#shoppingcart").style.visibility = 'visible';
		return;
	}

	let itemInfo = "";
	let totalCredits = 0;
	for (let i = 0; i < max; i++) {
		const arrayIndex = selectedItems[i];
		const course = courses[arrayIndex];
		const credits = course.credits

		itemInfo += "<tr><td>" + course.subject + "</td>";
		itemInfo += "<td>" + course.courseid + "</td>";
		itemInfo += "<td>" + course.title + "</td>";
		itemInfo += "<td>" + course.credits + "</td>";
		itemInfo += "<td><button class=\"btn btn-danger\" type=\"button\" onclick=\"deleteItem(" + arrayIndex + ")\">Remove</button></td></tr>"; 
		totalCredits += parseInt(credits);
	}

	document.querySelector(".cartItems").innerHTML = itemInfo;
	document.querySelector(".cartSummary").innerHTML = "<strong>Total classes selected:</strong> " + max;
	document.querySelector("#totalCredits").innerHTML = "<strong>Total Credits:</strong> " + totalCredits;
	
	if(totalCredits >= 18) {
		document.querySelector("#warning").innerHTML = `<p>WARNING: You may not exceed 18 credits per semester 
								unless you have received permission from the dean of your college.</p>
								<p>For more information, <a href="https://www.uww.edu/aaec/faqs#ci_whatis" target="_blank">visit the FAQ!</a></p>`;
	}
	
	document.querySelector("#shoppingcart").style.visibility = 'visible';
}

function displayResult(){
	if (selectedItems.length > 0) {
		let itemInfo = "";
		const max = selectedItems.length;
		for (let i=0; i < max; i++){
			const index = selectedItems[i];
			const course = courses[index];

			itemInfo += "<tr><td>" + course.title + "</td>";
			itemInfo += "<td>" + course.credits + "</td></tr>";
		}
		document.querySelector(".summaryBody").innerHTML = itemInfo;
	}
}

function resetCalculations() {
	document.querySelector('.summaryBody').textContent = "";
}

function deleteItem(index) {
	selectedItems = selectedItems.filter(function(item){
		return item !== index;
	});
	displayShoppingCart();
	displayResult();
}