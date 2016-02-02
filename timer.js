let p = p => decodeURI((new RegExp(`[#&]${p}=([^&]*)`).exec(window.location.hash) || [])[1] || '')
let t = p('t') || 3600
let e = document.getElementsByTagName('input')[0]
let tid
let displayTimer = () => {
  e.value = [t / 3600, t / 60 % 60, t % 60]
    .map(t => 0 | t)
    .reduce((a, t) => ((a.length || t) && a.push(t), a), [])
    .map(t => ('0' + t).slice(-2))
    .join(':') || '00'
}
let startTimer = () => {
  tid = setInterval(() => {
    --t < 1 && clearInterval(tid)
    displayTimer()
  }, 1000)
}
e.addEventListener('focus', () => {
  clearInterval(tid)
})
e.addEventListener('blur', () => {
  t = e.value.split(':').map(v => parseInt(v, 10))
  t = (t.pop() || 0) + (t.pop() || 0) * 60 + (t.pop() || 0) * 3600
  startTimer()
})
displayTimer()
startTimer()
