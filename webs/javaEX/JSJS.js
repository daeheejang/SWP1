const img = document.querySelector("#answer");

const select = [undefined]; // select��� �迭���� [undefined] or [-1] or [0] or [1]�� ���� �ȴ�. 
const scissorAnswer = -1; // -1�� ������ �ǹ�
const rockAnswer = 0; // 0�� ������ �ǹ�
const paperAnswer = 1; // 1�� ���ڱ⸦ �ǹ�

const rotate = () => { // ������ ī�带 �����´�.
    let elem = document.querySelector("#counter");
    if (elem.style.transform == "rotateY(180deg)") {
        elem.style.transform = "rotateY(0deg)";
    } else {
        elem.style.transform = "rotateY(180deg)";
    }
}

const scissor = document.querySelector("#����");
const rock = document.querySelector("#����");
const paper = document.querySelector("#��");
const countdown = document.querySelector(".countdown");

const scissorSelect = () => {
    rock.style.width = "170px";
    rock.style.height = "255px";
    scissor.style.width = "204px";
    scissor.style.height = "306px";
    paper.style.width = "170px";
    paper.style.height = "255px";
    select[0] = scissorAnswer; // 0��° �ε����� scissorAnswer, �� -1�� ���� -> select = [-1]
}

const rockSelect = () => {
    rock.style.width = "204px";
    rock.style.height = "306px";
    scissor.style.width = "170px";
    scissor.style.height = "255px";
    paper.style.width = "170px";
    paper.style.height = "255px";
    select[0] = rockAnswer; // 0��° �ε����� rockAnswer, �� 0�� ���� -> select = [0]
}

const paperSelect = () => {
    rock.style.width = "170px";
    rock.style.height = "255px";
    scissor.style.width = "170px";
    scissor.style.height = "255px";
    paper.style.width = "204px";
    paper.style.height = "306px";
    select[0] = paperAnswer; // 0��° �ε����� paperAnswer, �� 1�� ���� -> select = [1]
}

const countdownSubmit = () => {
    if (countdown.innerHTML == "Ready" && !(select[0] == undefined)) { // ���� �ؽ�Ʈ�� Ready�� �Ǿ�������, select �迭�� [undenified]�� �ƴ϶�� ����
        countdown.innerHTML = "3";
        setTimeout(() => { // 1�� �� Ready ��ġ�� �ִ� text�� 2�� ����
            countdown.innerHTML = "2";
        }, 1000);
        setTimeout(() => { // 2�� �� Ready ��ġ�� �ִ� text�� 1�� ����
            countdown.innerHTML = "1";
        }, 2000);
        setTimeout(() => { // 3�� �� Ready ��ġ�� �ִ� text�� 0���� ����
            countdown.innerHTML = "0";
        }, 3000);
        setTimeout(() => { // 4�� �� Ready ��ġ�� �ִ� text�� Win, Draw, Lose �� �ϳ��� ����
            rotate(); // ������� ī�带 ������ �Լ� ����
            countdown.innerHTML = start();
        }, 4000);
        setTimeout(() => { // 9�� �� ���󺹱�
            rotate(); // ������� ī�带 ������ �Լ� ����(���󺹱�)
            countdown.innerHTML = "Ready"; // �ٽ� Ready�� ����
        }, 9000);
    } else if (select[0] == undefined) { // ������������ ���õ��� ������ select �迭�� �ʱ� ������� [undefined]�� ��, ���� ������������ �������� ���� ���̹Ƿ� �˸��� ����ָ�, ���������� ���� �Ǵ��� ���� �ʴ´�.
        alert("������������ �����ϼ���!")
    }
}

scissor.addEventListener("click", scissorSelect); // ���� ī�� Ŭ���� scissorSelect �Լ� �����ϴ� �̺�Ʈ ���
rock.addEventListener("click", rockSelect); // ���� ī�� Ŭ���� scissorSelect �Լ� �����ϴ� �̺�Ʈ ���
paper.addEventListener("click", paperSelect); // ���ڱ� ī�� Ŭ���� scissorSelect �Լ� �����ϴ� �̺�Ʈ ���
countdown.addEventListener("click", countdownSubmit); // Ready text Ŭ���� countdownSubmit �Լ� �����ϴ� �̺�Ʈ ��� 

const numToDetail = (num) => { // -1, 0, 1�� ����, ����, ���ڱ�� ��ȯ���ִ� �Լ�
    return num == -1 ? "����"
        : num == 0 ? "����"
            : num == 1 ? "���ڱ�"
                : "error : " + num;
}

const start = () => { // �����Լ���, ������ �и� �����ϰ�,
    let answer = randomNumber(-1, 1);
    changeIMG(answer);
    console.log("���� :", numToDetail(answer))
    let submit = select[0];
    console.log("����� :", numToDetail(submit))
    return judge(answer, submit);
};

const changeIMG = (answer) => { // randomNumber�κ��� ������ answer, �� ������� �п� ���� �̹����� �����Ѵ�. // -1 -> ����, 0 -> ����, 1 -> ���ڱ�
    if (answer == -1) {
        img.src = "img/����.png";
    } else if (answer == 0) {
        img.src = "img/�ָ�.png";
    } else {
        img.src = "img/���ڱ�.png";
    }
};

const randomNumber = (n, m) => { // n���� m������ ������ ���ڸ� ����� ���� �߻� �Լ��� ���弼��! return Ÿ���� INT�Դϴ�!
    return Math.floor(Math.random() * (m - n + 1)) + n;
};

const judge = (answer, submit) => { // ����� "Draw", "Lose", "Win" ���·� �����Ͽ� String�� ���·� return�ϼ���!
    /*  0  -1   0   1      -1(��)  0(���)  1(�̱�)      -1, 2 ��    1, -2 �̱�  0 ���
        1  -1   0   1      -2(�̱�)-1(��)   0(���)
        -1 -1   0   1       0(���) 1(�̱�) 2(��)
     * ���� = -1, ���� = 0, ���ڱ� = 1 �Դϴ�.
     * answer���� ����� ī��δ� -1, 0, 1 �� �ϳ��� ���� ���ɴϴ�.
     * submit���� �ڽ��� ������ ī�忡 ���� -1, 0, 1 �� �ϳ��� ���� ���ɴϴ�.
     * answser�� submit�� ���� ���Ͽ� �ڽ��� ������, ������, �̰���� �Ǵ��ϴ� �Լ��� ���弼��! 
     * return Ÿ���� ���ڿ��� String�̸�, "Draw", "Lose", "Win" �� �ϳ��� return�ǰ� �ϸ� �˴ϴ�!
     */

    let scoreGap = submit - answer;
    if (scoreGap == 0) {
        return "Draw";
    }
    else if (scoreGap == -1 || scoreGap == 2) {
        return "Lose";
    }
    else {
        return "Win";
    }
};