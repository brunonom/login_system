let bgColor;
let theCanvas;
let lighten = 1;
let block_qtt = 30;
let block_size;

function setup(){
	console.log("start");
	frameRate(30);
	colorMode(HSL);
	textAlign(CENTER, CENTER);
	textStyle(BOLD);
	textSize(10);

	setBackground();
	login_elements();
}

function draw(){
	background(bgColor);
	dynamic_light();
	// show_grid();
	black_border();

	fill(100); noStroke();
	rect(x_col(9), y_row(10), block_size*5, block_size*2);
	rect(x_col(9), y_row(13), block_size*5, block_size*2);
}

function x_col(x){return (windowWidth - windowHeight)/2 + block_size*x;}

function y_row(y){return block_size*y;}

function setBackground(){
	// create canvas behind all elements
		theCanvas = createCanvas(windowWidth, windowHeight);
		theCanvas.style("z-index", -1);

	// center canvas
		const x = (windowWidth - width) / 2;
		const y = (windowHeight - height) / 2;
		theCanvas.position(x, y);

	// set block_size
		block_size = windowHeight/block_qtt;

	// set background color 
		bgColor = color(244, 87, 30);
		background(bgColor);
}

function show_grid(){
	noFill(); stroke(0, 100, 50); strokeWeight(1);
	for(let i=0; i<=block_qtt; i++){
		line(x_col(0), y_row(i), x_col(block_qtt), y_row(i));
		line(x_col(i), y_row(0), x_col(i), y_row(block_qtt));
		text(i, x_col(i), y_row(0) + block_size/2);
		text(i, x_col(0) - block_size, y_row(i));
	}
}

function black_border(){
	noFill(); stroke(0); strokeWeight(5);
	rect(y_row(1), y_row(1), windowWidth-y_row(2), windowHeight-y_row(2));
}

function dynamic_light(){
	if(abs(lightness(bgColor) - 25) < 0.1){lighten = 1;}
	if(abs(lightness(bgColor) - 35) < 0.1){lighten = 0;}
	if(lighten == 1){bgColor = color(244, 87, (lightness(bgColor)+0.0625));}
	if(lighten == 0){bgColor = color(244, 87, (lightness(bgColor)-0.0625));}
}

function login_elements(){
	const username_div = createDiv();
	username_div.size(block_size*5, block_size*2);
	username_div.position(x_col(9), y_row(10));
		const username_label = createP("username");
		username_label.parent(username_div);
		// username_label.style("color: green");
		username_label.style("font-size: 20px");
		username_label.show();

	const password_div = createDiv();
	password_div.size(block_size*5, block_size*2);
	password_div.position(x_col(9), y_row(13));
		const password_label = createP("password");
		password_label.parent(password_div);
		// password_label.style("color: green");
		password_label.style("font-size: 20px");
		password_label.show();

	// const login_form = createElement("form");
	// login_form.attribute("onsubmit", "login()");

		const username_input = createInput();
		// username_input.parent(login_form);
		username_input.id("username");
		username_input.size(block_size*10, block_size*2);
		username_input.position(x_col(15), y_row(10));
		username_input.style("font-size: 20px");
		username_input.attribute("type", "text");
		username_input.attribute("required", "");
		username_input.attribute("onkeydown", "focus_password(event)");
		document.getElementById("username").focus();
		username_input.show();

		const password_input = createInput();
		// password_input.parent(login_form);
		password_input.id("password");
		password_input.size(block_size*10, block_size*2);
		password_input.position(x_col(15), y_row(13));
		password_input.style("font-size: 20px");
		password_input.attribute("type", "password");
		password_input.attribute("required", "");
		password_input.attribute("onkeydown", "login(event)");
		password_input.show();
}

function focus_password(event){
	if(event.keyCode == 13){
		document.getElementById("password").focus();
	}
}

function login(event){
	if(event.keyCode == 13){
		const username_input = select("#username");
		const username = username_input.value();
		console.log(username);

		const password_input = select("#password");
		const password = password_input.value();
		console.log(password);
	}
}
