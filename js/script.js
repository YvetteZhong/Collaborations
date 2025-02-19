// script.js
function openTab(evt, tabName) {
    // 获取所有标签按钮和内容区域
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    tablinks = document.getElementsByClassName("tab-btn");
  
    // 隐藏所有内容区域并移除活动状态标记（如果有的话）
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
  
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // 显示当前选中的标签内容，并添加活动状态标记到对应的按钮上。
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    window.scrollTo(0, 0); // 切换后滚动到顶部
}

//surveyForm
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    sum=0;
    var nameList=new Array("motivation","frequency","type","priority");
    for(var i=0; i<4; i++)
    {
        switch(document.forms["surveyForm"][nameList[i]].value)
        {
            case "0":
                sum += 0;
                break;
            case "1":
                sum += 1;
                break;
            case "2":
                sum += 2;
                break;
            case "3":
                sum += 3;
                break;
            default:
                window.alert("wrong");
        }
    }
    resultHTML = ``;
    switch(sum)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            resultHTML = `<b>The Casual Sipper</b>
                <br/>You enjoy IP collaborations in a laid-back way, choosing practicality over hype. While you may appreciate creative designs, your purchasing decisions are driven by convenience and value rather than exclusivity or fandom loyalty. Limited-edition drops and themed merchandise don't hold strong appeal unless they align with your existing preferences.
                <br/>Tip: Stick to occasional purchases that naturally fit your lifestyle. Instead of chasing every trend, focus on collaborations that offer quality products or useful items that you’ll genuinely enjoy. If you're ever drawn to an IP collab, opt for practical choices like unique packaging or flavors rather than collectible merchandise.`;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            resultHTML = `<b>The Experience Seeker</b>
                <br/>You appreciate IP collaborations for their storytelling and immersive elements, but you remain selective about your purchases. Rather than seeking out every new release, you prefer experiences that let you engage with your favorite themes in creative and interactive ways. Whether it’s themed store pop-ups, digital experiences, or limited-time drink flavors, you prioritize novelty and enjoyment over pure collectibility.
                <br/>Tip: Look for collaborations that offer more than just products—whether it’s an engaging in-store atmosphere, interactive elements, or innovative packaging. By focusing on quality experiences rather than collecting every piece of merch, you can enjoy the magic of IP branding without unnecessary spending.`;
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            resultHTML = `<b>The Ultimate Collector</b>
                <br/>You are a passionate fan who thrives on exclusivity and nostalgia. Limited-edition drops, rare collectibles, and collaborations with classic or beloved IPs excite you the most. You likely follow release schedules closely and don’t hesitate to join pre-orders or exclusive events to secure highly sought-after items. For you, IP collaborations are more than just products—they’re a way to celebrate and deepen your connection with your favorite franchises.
                <br/>Tip: Stay updated on upcoming releases on official site and be proactive about securing exclusive merchandise before they sell out. Limited-time preorders and early-bird sales can be your best friends. Engage with fan communities to exchange insights, trade collectibles, and maximize your collection’s value.`;
            break;
        default:
            resultHTML = `wrong`;
    }

    // 显示结果
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    document.getElementById('resultContent').innerHTML = resultHTML;

});

// postform
// 初始化帖子数据（本地存储）
let posts = JSON.parse(localStorage.getItem('posts')) || [];
// 初始化加载已存在的帖子
window.onload = function() {
    renderPosts();
};
// 创建新帖子
function createPost() {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
            
    // 简单的表单验证
    if (!titleInput.value.trim() || !contentInput.value.trim()) {
        alert('标题和内容不能为空！');
        return;
    }

    // 创建帖子对象
    const newPost = {
        id: Date.now(),
        title: titleInput.value,
        content: contentInput.value,
        timestamp: new Date().toLocaleString()
    };

    // 添加到帖子数组
    posts.unshift(newPost);
            
    // 保存到本地存储
    localStorage.setItem('posts', JSON.stringify(posts));
            
    // 清空输入框
    titleInput.value = '';
    contentInput.value = '';
            
    // 重新渲染帖子列表
    renderPosts();
}

// 删除帖子
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

// 渲染帖子列表
function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '<h2>List: </h2>';
            
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p >
            <div class="post-time">Release time: ${post.timestamp}</div>
            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
        `;
        container.appendChild(postElement);
    });
}
