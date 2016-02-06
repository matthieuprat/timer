class Timer {
  constructor (cb) {
    this.cb = cb
  }
  start (t) {
    if (t !== undefined) this.reset(t)
    if (this.tid !== undefined) return
    this.tid = setInterval(() => {
      this.cb(this)
      if (this.time() < 0) this.stop()
    }, 1000)
  }
  stop () {
    clearInterval(this.tid)
    this.tid = undefined
  }
  reset (t = 0) {
    this.to = Timer.now(t)
  }
  time () {
    return this.to - Timer.now()
  }
  toString () {
    let t = this.time()
    if (t <= 0) return '00'
    return [t / 3600, t / 60 % 60, t % 60]
           .map(t => 0 | t)
           .reduce((a, t) => ((a.length || t) && a.push(t), a), [])
           .map(t => ('0' + t).slice(-2))
           .join(':')
  }
  static parse (s) {
    let components = s.split(':').map(v => parseInt(v, 10))
    return components.reduceRight((t, c, i) => t + Math.pow(60, components.length - i - 1) * c)
  }
  static now (offset = 0) {
    return 0 | Date.now() / 1000 + offset
  }
}

const p = p => decodeURI((new RegExp(`[#&]${p}=([^&]*)`).exec(window.location.hash) || [])[1] || '')
const elt = document.getElementsByTagName('input')[0]
const timer = new Timer(t => { elt.value = t.toString() })

elt.addEventListener('focus', () => timer.stop())
elt.addEventListener('blur',  () => timer.start(Timer.parse(elt.value)))

document.addEventListener('keypress', (e) => {
  if (e.keyCode !== 32) return
  e.preventDefault()
  if (elt === document.activeElement) {
    elt.blur()
  } else {
    elt.focus()
    elt.select()
  }
})
elt.addEventListener('keypress', (e) => e.keyIdentifier === 'Enter' && elt.blur())

timer.start(Timer.parse(p('t') || '3600'))
elt.value = timer.toString()
