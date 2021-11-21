let task_name = document.getElementsByClassName("task_name")[0];
let task_add = document.getElementsByClassName("task_add")[0];
let task_list = document.getElementsByClassName("task_list")[0];
let btn_empty = document.getElementsByClassName("btn_empty")[0];




// 聚焦跟失焦輸入欄位時發生css變化
task_name.addEventListener("focus", function(){
    task_name.parentElement.classList.add("-on");
});

task_name.addEventListener("blur", function(){
    task_name.parentElement.classList.remove("-on");
});

// 按下新增按鈕後新增事件並且儲存到localStorage
function addListItems(){

    task_add.addEventListener("click", function(){
        console.log(this.previousSibling.previousSibling); //this.previousSibling是html換行時的空白字元文字節點

        if(this.previousSibling.previousSibling.value){
            // 儲存到localStorage
            let item_id = Date.now();
            let task = {
                "item_id": item_id,
                "name": this.previousSibling.previousSibling.value.trim(), // 新增的待辦事項文字
                "star": 0 // 預設 0,
            };
            let tasks = JSON.parse(localStorage.getItem("tasks"));

            if(!tasks){
                tasks = [task];
            }
            else{
                tasks.unshift(task);
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));

            // 新增節點到task_list裡
            task_list.insertAdjacentHTML("afterbegin", 
            `<li data-id = ${item_id}>
                <div class="item_flex">
                    <div class="left_block">
                        <div class="btn_flex">
                        <button type="button" class="btn_up">往上</button>
                        <button type="button" class="btn_down">往下</button>
                        </div>
                    </div>
                    <div class="middle_block">
                        <div class="star_block">
                            <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                            <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                            <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                            <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                            <span class="star" data-star="5"><i class="fas fa-star"></i></span>
                        </div>
                        <p class="para">${this.previousSibling.previousSibling.value}</p>
                        <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${this.previousSibling.previousSibling.value}">
                    </div>
                    <div class="right_block">
                        <div class="btn_flex">
                            <button type="button" class="btn_update">更新</button>
                            <button type="button" class="btn_delete">移除</button>
                        </div>
                    </div>
                </div>
            </li>`);

            this.previousSibling.previousSibling.value = ""; //清空輸入欄位

            deleteItemInClickAndKeydown(item_id);

            upDateInClickAndKeydown(item_id);

            btnUpAndDownInClickAndKeydown(item_id);

            starInClickAndKeydown(item_id);
        }

    })

    task_name.addEventListener("keydown", function(event){

        if(event.which === 13 && this.value){

            // 儲存到localStorage
            let item_id = Date.now();

            let task = {

                "item_id": item_id,
                "name": this.value, // 新增的待辦事項文字
                "star": 0 // 預設 0
            };

            let tasks = JSON.parse(localStorage.getItem("tasks"));

            if(!tasks){

                tasks = [task];
            }
            else{

                tasks.unshift(task);
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));

            // 新增節點到task_list裡
            task_list.insertAdjacentHTML("afterbegin", 
            `<li data-id = ${item_id}>
                <div class="item_flex">
                    <div class="left_block">
                        <div class="btn_flex">
                            <button type="button" class="btn_up">往上</button>
                            <button type="button" class="btn_down">往下</button>
                        </div>
                    </div>
                    <div class="middle_block">
                        <div class="star_block">
                        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
                        </div>
                        <p class="para">${this.value}</p>
                        <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${this.value}">
                    </div>
                    <div class="right_block">
                        <div class="btn_flex">
                            <button type="button" class="btn_update">更新</button>
                            <button type="button" class="btn_delete">移除</button>
                        </div>
                    </div>
                </div>
            </li>`);

            this.value = ""; //清空輸入欄位

            deleteItemInClickAndKeydown(item_id);

            upDateInClickAndKeydown(item_id);

            btnUpAndDownInClickAndKeydown(item_id);

            starInClickAndKeydown(item_id);
        }
    })
}

// function宣告區域

// 每個選項刪除按鈕事件在click事件跟keydown事件適用
function deleteItemInClickAndKeydown(item_id){
    // 刪除處理
    let btn_delete = document.getElementsByClassName("btn_delete");

    for(let i = 0; i < btn_delete.length; i = i + 1){

        if(btn_delete[i].parentElement.parentElement.parentElement.parentElement.getAttribute("data-id") === item_id.toString()){

            btn_delete[i].addEventListener("click", function(){

                if(window.confirm("確定移除此項目？")){

                    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
                    for(let i = 0; i < tasks.length; i = i + 1){
                        if(tasks[i].item_id.toString() === this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")){
    
                            tasks.splice(i, 1);

                            localStorage.setItem("tasks", JSON.stringify(tasks));

                            this.parentElement.parentElement.parentElement.parentElement.classList.add("fade_out");

                            let btn = this;

                            setTimeout(function(){
                                btn.parentElement.parentElement.parentElement.parentElement.remove();
                            }, 1000);
    
                            return;
                        }
                    }
                }
            });
        }
    };
}

// 每個選項的刪除按鈕事件
function deleteItem(){

    let btn_delete = document.getElementsByClassName("btn_delete");
    console.log(btn_delete);

    for(let i = 0; i < btn_delete.length; i = i + 1){
        btn_delete[i].addEventListener("click", function(){

            if(window.confirm("確定移除此項目？")){

                let tasks = JSON.parse(localStorage.getItem("tasks"));

                for(let i = 0; i < tasks.length; i = i + 1){

                    if(tasks[i].item_id.toString() === this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")){

                        tasks.splice(i, 1);

                        localStorage.setItem("tasks", JSON.stringify(tasks));

                        this.parentElement.parentElement.parentElement.parentElement.classList.add("fade_out");

                        let btn = this;

                        setTimeout(function(){

                            btn.parentElement.parentElement.parentElement.parentElement.remove();
                        }, 1000);

                        return;
                    }
                }
            }
        });
    }
}

// 全部清空按鈕
function allDelete(){

    btn_empty.addEventListener("click", function(){

        if(window.confirm("確定要全部清空？")){

            for(let i = 0; i < task_list.children.length; i = i + 1){

                task_list.children[i].classList.add("fade_out");
            }

            setTimeout(function(){

                task_list.innerHTML = "";
            }, 1000);

            let empty = [];

            localStorage.setItem("tasks", JSON.stringify(empty));
        }
    });
}

// 更新處理在click事件和keydown事件裡適用
function upDateInClickAndKeydown(item_id){

    let btn_update = document.getElementsByClassName("btn_update");

    for(let i = 0; i < btn_update.length; i = i + 1){

        if(item_id.toString() === btn_update[i].closest("li").getAttribute("data-id")){

            btn_update[i].addEventListener("click", function(){
                
                let tasks = JSON.parse(localStorage.getItem("tasks"));

                // 判斷點擊更新按鈕前的更新輸入欄位狀態
                if(!(this.parentElement.parentElement.previousElementSibling.children[2].classList.contains("-none")) && !(this.parentElement.parentElement.previousElementSibling.children[2].value)){
                    window.alert("請輸入代辦事項");
                }
                else if(!(this.parentElement.parentElement.previousElementSibling.children[2].classList.contains("-none")) && this.parentElement.parentElement.previousElementSibling.children[2].value){

                    // 更新localStorage裡面的值
                    for(let i = 0; i < tasks.length; i = i + 1){

                        if(tasks[i].item_id.toString() === this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")){

                            tasks[i].name = this.parentElement.parentElement.previousElementSibling.children[2].value;
                            
                            localStorage.setItem("tasks", JSON.stringify(tasks));
                            
                            // 更新子項目的文字內容
                            this.parentElement.parentElement.previousElementSibling.children[1].innerHTML = this.parentElement.parentElement.previousElementSibling.children[2].value;

                            this.parentElement.parentElement.previousElementSibling.children[2].classList.add("-none");

                        }
                    }
                } 
                else if(this.parentElement.parentElement.previousElementSibling.children[2].classList.contains("-none")){
                    this.parentElement.parentElement.previousElementSibling.children[2].classList.remove("-none");
                }
            })
        }
    }
}

// 處理更新
function upDate(){

    let btn_update = document.getElementsByClassName("btn_update");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
    for(let i = 0; i < btn_update.length; i = i + 1){
        
        btn_update[i].addEventListener("click", function(){
            
            // 判斷點擊更新按鈕前的更新輸入欄位狀態
            if(!(this.parentElement.parentElement.previousElementSibling.children[2].classList.contains("-none")) && !(this.parentElement.parentElement.previousElementSibling.children[2].value)){
                window.alert("請輸入代辦事項");
            }
            else if(!(this.parentElement.parentElement.previousElementSibling.children[2].classList.contains("-none")) && this.parentElement.parentElement.previousElementSibling.children[2].value){
                // 更新localStorage裡面的值
                for(let i = 0; i < tasks.length; i = i + 1){

                    if(tasks[i].item_id.toString() === this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")){

                        tasks[i].name = this.parentElement.parentElement.previousElementSibling.children[2].value;
                        
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                        
                        // 更新子項目的文字內容
                        this.parentElement.parentElement.previousElementSibling.children[1].innerHTML = this.parentElement.parentElement.previousElementSibling.children[2].value;

                        this.parentElement.parentElement.previousElementSibling.children[2].classList.add("-none");

                    }
                }
            }
            else if(this.parentElement.parentElement.previousElementSibling.children[2].classList.contains("-none")){
                this.parentElement.parentElement.previousElementSibling.children[2].classList.remove("-none");
            }
        });
    }
}

// 交換順序往上往下在click事件和keydown事件裡適用
function btnUpAndDownInClickAndKeydown(item_id){

    let btn_up = document.getElementsByClassName("btn_up");

    let btn_down = document.getElementsByClassName("btn_down");

    for(let i = 0; i < btn_up.length; i = i + 1){

        // 判斷往上的按鈕是在哪一個li上
        if(btn_up[i].closest("li").getAttribute("data-id") === item_id.toString()){

            btn_up[i].addEventListener("click", function(){

                let currentLi = this.closest("li");
                
                let currentLiData;
                
                let previousLi = this.closest("li").previousElementSibling;
                
                let tasks = JSON.parse(localStorage.getItem("tasks"));

                for(let i = 0; i < tasks.length; i = i + 1){

                    // 判斷點擊的這一個往上按鈕的li是在localStorage的哪個位置
                    if(tasks[i].item_id.toString() === this.closest("li").getAttribute("data-id")){

                        // 判斷往上的按鈕是否是最上層
                        if(!(currentLi.previousElementSibling)){

                            window.alert("目前在最上層");
                        }
                        else{

                            currentLiData = this.closest("li").outerHTML;

                            previousLi.insertAdjacentHTML("beforebegin", currentLiData);

                            currentLi.remove();

                            deleteItemInClickAndKeydown(previousLi.previousElementSibling.getAttribute("data-id"));

                            upDateInClickAndKeydown(previousLi.previousElementSibling.getAttribute("data-id"));

                            btnUpAndDownInClickAndKeydown(previousLi.previousElementSibling.getAttribute("data-id"));
                            
                            // 更新localStorage裡的值
                            let temp = tasks[i];

                            tasks[i] = tasks[i-1];

                            tasks[i-1] = temp;

                            localStorage.setItem("tasks", JSON.stringify(tasks));
                        }

                        return;
                    }
                }
            });
        }

         // 判斷往下的按鈕是在哪一個li上
         if(btn_down[i].closest("li").getAttribute("data-id") === item_id.toString()){

            btn_down[i].addEventListener("click", function(){

                let currentLi = this.closest("li");
                
                let currentLiData;
                
                let nextLi = this.closest("li").nextElementSibling;
                
                let tasks = JSON.parse(localStorage.getItem("tasks"));

                for(let i = 0; i < tasks.length; i = i + 1){

                    // 判斷點擊的這一個往上按鈕的li是在localStorage的哪個位置
                    if(tasks[i].item_id.toString() === this.closest("li").getAttribute("data-id")){

                        // 判斷往上的按鈕是否是最上層
                        if(!(currentLi.nextElementSibling)){

                            window.alert("目前在最下層");
                        }
                        else{

                            currentLiData = this.closest("li").outerHTML;

                            nextLi.insertAdjacentHTML("afterend", currentLiData);

                            currentLi.remove();

                            deleteItemInClickAndKeydown(nextLi.nextElementSibling.getAttribute("data-id"));

                            upDateInClickAndKeydown(nextLi.nextElementSibling.getAttribute("data-id"));

                            btnUpAndDownInClickAndKeydown(nextLi.nextElementSibling.getAttribute("data-id"));
                            
                            // 更新localStorage裡的值
                            let temp = tasks[i];

                            tasks[i] = tasks[i+1];

                            tasks[i+1] = temp;

                            localStorage.setItem("tasks", JSON.stringify(tasks));
                        }

                        return;
                    }
                }
            });
        }
    };
};

// 交換順序往上往下
function btnUpAndDown(){

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    let btn_up = document.getElementsByClassName("btn_up");

    let btn_down = document.getElementsByClassName("btn_down");

    for(let i = 0; i < btn_up.length; i = i + 1){

        // 往上的按鈕
        btn_up[i].addEventListener("click", function(){

            let currentLi = this.closest("li");
            
            let currentLiData;
            
            let previousLi = this.closest("li").previousElementSibling;
            
            let tasks = JSON.parse(localStorage.getItem("tasks"));

            for(let i = 0; i < tasks.length; i = i + 1){

                // 判斷點擊的這一個往上按鈕的li是在localStorage的哪個位置
                if(tasks[i].item_id.toString() === this.closest("li").getAttribute("data-id")){

                    // 判斷往上的按鈕是否是最上層
                    if(!(currentLi.previousElementSibling)){

                        window.alert("目前在最上層");
                    }
                    else{

                        currentLiData = this.closest("li").outerHTML;

                        previousLi.insertAdjacentHTML("beforebegin", currentLiData);

                        currentLi.remove();

                        deleteItemInClickAndKeydown(previousLi.previousElementSibling.getAttribute("data-id"));

                        upDateInClickAndKeydown(previousLi.previousElementSibling.getAttribute("data-id"));

                        btnUpAndDownInClickAndKeydown(previousLi.previousElementSibling.getAttribute("data-id"));
                        
                        // 更新localStorage裡的值
                        let temp = tasks[i];

                        tasks[i] = tasks[i-1];

                        tasks[i-1] = temp;

                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    }

                    return;
                }
            }
        });

         // 判斷往下的按鈕是在哪一個li上
        btn_down[i].addEventListener("click", function(){

            let currentLi = this.closest("li");
            
            let currentLiData;
            
            let nextLi = this.closest("li").nextElementSibling;
            
            let tasks = JSON.parse(localStorage.getItem("tasks"));

            for(let i = 0; i < tasks.length; i = i + 1){

                // 判斷點擊的這一個往上按鈕的li是在localStorage的哪個位置
                if(tasks[i].item_id.toString() === this.closest("li").getAttribute("data-id")){

                    // 判斷往上的按鈕是否是最上層
                    if(!(currentLi.nextElementSibling)){

                        window.alert("目前在最下層");
                    }
                    else{

                        currentLiData = this.closest("li").outerHTML;

                        nextLi.insertAdjacentHTML("afterend", currentLiData);

                        currentLi.remove();

                        deleteItemInClickAndKeydown(nextLi.nextElementSibling.getAttribute("data-id"));

                        upDateInClickAndKeydown(nextLi.nextElementSibling.getAttribute("data-id"));

                        btnUpAndDownInClickAndKeydown(nextLi.nextElementSibling.getAttribute("data-id"));
                        
                        // 更新localStorage裡的值
                        let temp = tasks[i];

                        tasks[i] = tasks[i+1];

                        tasks[i+1] = temp;

                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    }

                    return;
                }
            }
        });
    };
}

// 星數增減適用於click以及keydown
function starInClickAndKeydown(item_id){

    let star_block = document.getElementsByClassName("star_block");

    for(let i = 0; i < star_block.length; i = i + 1){

        if(star_block[i].closest("li").getAttribute("data-id") === item_id.toString()){

            star_block[i].addEventListener("click", function(event){

                let tasks = JSON.parse(localStorage.getItem("tasks"));

                // 先全部reset成沒有星的狀態
                for( let i = 0; i < this.children.length; i = i + 1){
    
                    if(this.children[i].classList.contains("-on")){
                        
                        this.children[i].classList.remove("-on");
                    }
                }
                
                // 找到目標星數並且-1找到他的index值
                let target_index = Number(event.target.closest("span").getAttribute("data-star"));
                console.log(event.target, target_index);
    
                for(let i = 0; i < target_index; i = i + 1){
                    console.log(this.children[i]);
    
                    this.children[i].classList.add("-on");
                }

                // 更新localStorage
                for(let i = 0; i < tasks.length; i = i + 1){

                    if(tasks[i].item_id.toString() === this.closest("li").getAttribute("data-id")){

                        tasks[i].star = target_index;
                    }
                }
                console.log(tasks);

                localStorage.setItem("tasks", JSON.stringify(tasks));
            });
        }
    }
}

// 瀏覽器更新的時候星數更新
function star(){

    let star_block = document.getElementsByClassName("star_block");
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    for(let i = 0; i < star_block.length; i = i + 1){

        let item_id = star_block[i].closest("li").getAttribute("data-id");
        // 先reset
        for(let i = 0; i < star_block.children; i = i + 1){
            
            if(star_block[i].classList.contains("-on")){

                star_block[i].classList.remove("-on");
            }
        }
        
        let targetIndex = tasks[i].star;

        for(let j = 0; j < targetIndex; j = j + 1){

            console.log(star_block.item(i).children);
            star_block.item(i).children[j].classList.add("-on");
        }

        // 把刪減星星數量的事件綁上去
        starInClickAndKeydown(item_id);
    }
}

window.addEventListener("load", function(){

    addListItems();

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if(tasks){

        tasks.forEach(function(value, index){

            task_list.insertAdjacentHTML("beforeend", 
            `<li data-id = ${value.item_id}>
                <div class="item_flex">
                <div class="left_block">
                    <div class="btn_flex">
                        <button type="button" class="btn_up">往上</button>
                        <button type="button" class="btn_down">往下</button>
                    </div>
                </div>
                <div class="middle_block">
                    <div class="star_block">
                        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
                    </div>
                    <p class="para">${value.name}</p>
                    <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${value.name}">
                </div>
                <div class="right_block">
                    <div class="btn_flex">
                    <button type="button" class="btn_update">更新</button>
                    <button type="button" class="btn_delete">移除</button>
                    </div>
                </div>
                </div>
            </li>`);
        });
    }

    deleteItem();

    allDelete();

    upDate();

    btnUpAndDown();

    star();
});