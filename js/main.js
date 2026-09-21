// Red Auto Glass — 全站交互脚本
document.addEventListener('DOMContentLoaded', function () {
  // 移动端菜单
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // FAQ 手风琴
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // 覆盖区域选项卡
  document.querySelectorAll('.coverage-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('.coverage-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

  // 询价表单：本地展示提交成功（静态站点，不发送服务器）
  var form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('fName') || {}).value || '';
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = '#C8102E'; }
        else { f.style.borderColor = ''; }
      });
      if (!ok) return;
      form.style.display = 'none';
      var s = document.getElementById('formSuccess');
      if (s) {
        var who = s.querySelector('[data-name]');
        if (who && name) who.textContent = name;
        s.style.display = 'block';
      }
    });
  }

  // 页脚年份
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
