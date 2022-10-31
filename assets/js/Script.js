const upLoadBox = document.querySelector("form > :first-child")
const imgSrc = document.querySelector("img")
const inputWidth = document.querySelector('input[name="width"]')
const inputHeight = document.querySelector('input[name="height"]')
const aspectRatio = document.querySelector('input[name="ratio"')
const reduceQuality = document.querySelector('input[name="quality"')
const download = document.querySelector('button')
fileInput = document.querySelector("input")
let ogRation

changeFile = (e) => {
    file = e.target.files[0]
    if (!file) return
    imgSrc.src = URL.createObjectURL(file)
    imgSrc.addEventListener("load", () => {
        document.querySelector("form > :first-child").classList.add("active")
        inputHeight.value = imgSrc.naturalHeight
        inputWidth.value = imgSrc.naturalWidth
        ogRation = imgSrc.naturalHeight / imgSrc.naturalWidth
    })
}

downloadFunction = (e) => {
    const canvas = document.createElement('canvas')
    const a = document.createElement('a')
    const ctx = canvas.getContext('2d')

    const imageQuality = reduceQuality.checked ? 0.70 : 1.0

    canvas.width = inputWidth.value
    canvas.height = inputHeight.value

    ctx.drawImage(imgSrc, 0, 0, canvas.width, canvas.height)

    a.href = canvas.toDataURL("image/jpeg", imageQuality)
    a.download = new Date().getTime()
    a.click()
}

upLoadBox.addEventListener("click", () => {fileInput.click()})

fileInput.addEventListener("change", changeFile)

inputWidth.addEventListener('input', () => {
    height = aspectRatio.checked ? inputWidth.value / ogRation : inputHeight.value ;
    inputHeight.value = Math.floor(height)
})
inputHeight.addEventListener('input', () => {
    width = aspectRatio.checked ? inputHeight.value / ogRation : inputWidth.value  
    inputWidth.value = Math.floor(width)
})

download.addEventListener('click', downloadFunction)