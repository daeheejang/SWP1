/*
����
1. ���� �� �� ���� ��ġ�� ������ ��� ����� ĥ���ְ� �湮������ ������ ����.

2. ���ٸ� ��� �������� ���� ���ٸ��� ���� �������� ��Ʈ��ŷ�� ��. 
�� ��, ���²� �ɾ�� ��θ� ���ÿ� �����صθ� ������ �����鼭 �ǵ��ư��� �� ����.
(��� �׷��� ������������ �����ϸ� �����ϱ� ����)

3. �� ���� ���� ������ ���ÿ� �����ϰ�, �ٽ� ��Ʈ��ŷ �� ������ ���ÿ��� ���鼭 �����ϸ� 
�ڵ����� �� ������ ��ĵ�� �� ���� �������� ���ƿ��� ������ ���ΰ� �Ǹ� �˰����� �����.

! x, y ��ǥ�� ��� Ȧ���� ĭ���� ��� ������ �մ� �˰��� !

*/


var tc = 21; // tile count (������ Ȧ��)
var gs = 20; // �̷��� ���簢�� �� ĭ ������, grid size
var field; // �̷� ���� ���� ���� 0�� �� ��ġ �迭
var px = py = 1; // 0 < =  px,py < tc
var xv = yv = 0;
var tracker;
var stack;
var stucked; // �� :  ����, Ÿ�� : true, false
var cx, cy; // ��� �ٲ�� ���� ���� ��ǥ ��ġ


window.onload = function () {
	canv = document.getElementById("maze");	// �̷� ĵ����
	ctx = canv.getContext("2d"); // 2d �׷����� ���ؽ�Ʈ Ÿ�� ����
	document.addEventListener("keydown", keyPush); // Ű�� ������ �߻��ϴ� keydown Ÿ���� �̺�Ʈ
	initialize(); // ���� �����ϱ� ���� �Լ�

}

// enter Ű�� �����ٰ� ���� �� �̺�Ʈ
function enterkey() {
	if (window.event.keyCode == 13) { // enter Ű�� �ƽ�Ű �ڵ� : 13, ���͸� ������
		var sizeInput = document.getElementById("mazeSize").value; // �̷� ������, "mazeSize"��� Id�� value�� ã��
		if (sizeInput % 2 == 0) {
			alert("Please enter an odd number .");
		}
		else if (sizeInput % 2 == 1) {
			tc = sizeInput;
			initialize();
		}
		// ���⿡ ä���־� �ڵ带 �ϼ��ϼ���!
		/*
		 * �̷� ����� ¦���� "Please enter an odd number." ��� ��� �޽��� ����
		 * �̷� ����� Ȧ���� �̷��� ����� Ÿ���� ���� ������ ����, ���� ���� �Լ� ȣ��
		 */

	}
}


// �̷� Ż�� ���� ��, ������ ���µǰų�, ó�� ������ ������ �� ȣ�� �ϴ� �Լ�, ĵ���� ��Ÿ�� & ũ�⵵ �Բ� ����
function initialize() {
	document.getElementById("mazeSize").value = tc;
	make2DArray();

	ctx.fillStyle = "black"; // ĵ������ ��Ÿ�� ����
	canv.width = canv.height = tc * gs; // ĵ���� ũ�� ����

	// fillRect(x, y, width, height), �������� (x, y)�̰� ũ�� width, height
	ctx.fillRect(0, 0, canv.width, canv.height); // ĵ���� �������� ������ ũ�⸸ŭ�� �簢�� ����


	makeWay(0, 1);
	makeWay(tc - 1, tc - 2);

	px = py = 1;
	// tracker initial position
	tracker = { x: px, y: py };
	stack = [];
	stack.push(tracker);
	stucked = false;
	randomMazeGenerator();

	cx = 0; cy = 1;
	ctx.fillStyle = "red";
	ctx.fillRect(cx * gs, cy * gs, gs, gs); // �� ó�� ���� �� ��ġ

}

// �̷��� ���� �ƴ� ������ �� �ִ� ���� ��ġ�� �°� ��� Ÿ�Ϸ� �����ϴ� �Լ�
function makeWay(xx, yy) {
	field[yy][xx]++;
	ctx.fillStyle = "white";
	ctx.fillRect(xx * gs, yy * gs, gs, gs);
}

// ���� Ű �̺�Ʈ
function keyPush(evt) {

	switch (evt.keyCode) {

		// ���⿡ ä���־� �ڵ带 �ϼ��ϼ���!
		/*
		 * evt.keyCode : Ű���忡�� ���� Ű�� ���� �ĺ��ϴ� �ڵ�
		 * ���� Ű�� ���� ��ǥ �� ���� (���� ȭ��ǥ Ű, ���� ȭ��ǥ Ű, ������ ȭ��ǥ Ű, �Ʒ��� ȭ��ǥ Ű)
		 * �ּ����� 'here!!!' �Ǿ��ִ� �Ʒ��� �ڵ带 �����ؾ� �� (���� ��ǥ�� ���� ��� �ݿ��Ǵ°�)
		 * ! �ƽ�Ű �ڵ� !
		 * left : 37
		 * up : 38
		 * right : 39
		 * down : 40
		*/
		case 37:
			xv = -1;
			yv = 0;
			break;
		case 38:
			xv = 0;
			yv = -1;
			break;

		case 39:
			xv = 1;
			yv = 0;
			break;
		case 40:
			xv = 0;
			yv = 1;
			break;
	}



	cx += xv; // here!!!
	cy += yv; // here!!!
	if (cx < 0 || cx > tc - 1 || cy < 0 || cy > tc - 1 || field[cy][cx] == 0) {
		cx -= xv;
		cy -= yv;
		return;
	} else {
		ctx.fillStyle = "red";
		ctx.fillRect(cx * gs, cy * gs, gs, gs);
		ctx.fillStyle = "white";
		ctx.fillRect((cx - xv) * gs, (cy - yv) * gs, gs, gs);
		document.getElementById("text").innerHTML = "cx: " + cx + " cy: " + cy; // element ���� HTML�̳� XML ������, �� �� ��ǥ ��Ÿ����

		// ���⿡ ä���־� �ڵ带 �ϼ��ϼ���!
		/*
		 * ���� ��ġ ��ǥ�� ���� ������ ��ǥ�� ���Ͽ� ���� ������ �������� ��, "You Win!" �̶�� ��� �޽��� ����, ���� ���� �Լ� ȣ��
		 */
		if (cx == tc-1 && cy == tc - 2) {
			alert("You Win!");
			initialize();
		}
	}

}

// ���� �̷� ���� �Լ�
function randomMazeGenerator() {

	while (stack.length > 0) {

		// ���⿡ ä���־� �ڵ带 �ϼ��ϼ���!
		/*
		 * ���� ������ ��, �� ������ �� ���� �Լ� ȣ�� (��� ����, ��� ����, ��� �Լ��� ������� �� �����غ�����!)
		 */
		if (stucked) {
			backtracking();
		}
		else tracking();
	}
}


// ���� ������ �ʾ��� ���� �Լ�, tracking : ��ü Ž��, ����
function tracking() {
	key = Math.floor(Math.random() * 4);
	// ���⿡ ä���־� �ڵ带 �ϼ��ϼ���!
	/* 
		 * 0���� 3������ ������ �������� �����ϴ� key ���� ���� (Math.random �̿��ϱ�!, �� �� �ڵ�.)
		 */

	switch (key) {
		case 0: // left move
			xv = - 2; yv = 0;
			break;
		case 1: // up move
			xv = 0; yv = - 2;
			break;
		case 2: // right move
			xv = 2; yv = 0;
			break;
		case 3: // down move
			xv = 0; yv = 2;
			break;
	}

	px += xv;
	py += yv;
	if (px < 0 || px > tc - 1 || py < 0 || py > tc - 1) {
		px -= xv;
		py -= yv;
		return;
	}
	if (field[py][px] < 1) {
		makeWay(px - xv / 2, py - yv / 2);
		makeWay(px, py);
		tracker = { x: px, y: py };
		stack.push(tracker);
		blockCheck();
	} else {
		px -= xv;
		py -= yv;
		return;
	}

}

// ���� ������ ���� �Լ�, backtracking : �ظ� ã�� ���� �ذ� �ƴϾ ������, �ǵ��ư��� �ٽ� �ظ� ã�ư��� ���
function backtracking() {
	var backtracker = stack.pop(); //stack �迭�� ������ ��Ҹ� ������ ��, ������ ��Ҹ� ��ȯ
	px = backtracker.x;
	py = backtracker.y;
	blockCheck();
}

function make2DArray() {
	console.log("tc: " + tc);
	field = new Array(parseInt(tc)); // �迭 ����
	for (var i = 0; i < field.length; i++) {
		field[i] = new Array(parseInt(tc));
	}
	console.log("field length: " + field.length);
	for (var i = 0; i < field.length; i++) {
		for (var j = 0; j < field[i].length; j++) {
			field[i][j] = 0; // �� 0�� �湮���� ���� ���, 1�� �湮�� ���, 2�� backtracking ���
		}
	}
	console.log("field: " + field);
}

function blockCheck() {
	var blockCount = 0;
	if (py + 2 > tc - 1 || field[py + 2][px] != 0)
		blockCount++;
	if (py - 2 < 0 || field[py - 2][px] != 0)
		blockCount++;
	if (px + 2 > tc - 1 || field[py][px + 2] != 0)
		blockCount++;
	if (px - 2 < 0 || field[py][px - 2] != 0)
		blockCount++;
	if (blockCount >= 4)
		stucked = true;
	else
		stucked = false;
}