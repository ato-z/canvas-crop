// 我们先打开一个数据库
var DBOpenRequest = window.indexedDB.open("toDoList", 4);

const note = document.querySelector('ul')

// 当数据库打开出错/成功时，以下两个事件处理程序将分别对 IDBDatabase 对象进行下一步操作
DBOpenRequest.onerror = function (event) {
  note.innerHTML += "<li>Error loading database.</li>";
};

DBOpenRequest.onsuccess = function (event) {
  note.innerHTML += "<li>Database initialised.</li>";

  // 将打开数据库的结果存储在 db 变量中，该变量将在后面的代码中被频繁使用
  db = DBOpenRequest.result;

  // 运行 displayData() 方法，用 IDB 中已经存在的所有待办事项列表数据填充到任务列表中
  displayData();
};

// 当试图打开一个尚未被创建的数据库，或者试图连接一个数据库还没被创立的版本时，onupgradeneeded 事件会被触发

DBOpenRequest.onupgradeneeded = function (event) {
  var db = event.target!.result;

  db.onerror = function (event) {
    note.innerHTML += "<li>Error loading database.</li>";
  };

  // 使用 IDBDatabase.createObjectStore 方法，可创建一个对象存储区

  var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

  // 定义 objectStore 将包含哪些数据项

  objectStore.createIndex("hours", "hours", { unique: false });
  objectStore.createIndex("minutes", "minutes", { unique: false });
  objectStore.createIndex("day", "day", { unique: false });
  objectStore.createIndex("month", "month", { unique: false });
  objectStore.createIndex("year", "year", { unique: false });

  objectStore.createIndex("notified", "notified", { unique: false });

  note.innerHTML += "<li>Object store created.</li>";
};

function displayData() {
    note.innerHTML += "<li>查询数据</li>";   
}