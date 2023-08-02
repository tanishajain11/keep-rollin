const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

const frameCount = 180;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const currentFrame = (index) => `./swirl/${(index + 1).toString()}.jpg`;

const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});

gsap.fromTo(
  ".text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: true,
      start: "50%",
      end: "64%",
    },
    onComplete: () => {
      gsap.to(".text", 
      { opacity: 0,
    scrollTrigger: {
        scrub: 1,
        start: "64%",
        end: "71%",
    },
    });
    },
  }
);

gsap.fromTo(
    ".text2",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
  
        start: "71%",
        end: "78%",
      },
      onComplete: () => {
        gsap.to(".text2", {
          opacity: 0,
          scrollTrigger: {
            scrub: 1,
  
            start: "72%",
            end: "78%",
          },
        });
      },
    }
  );

images[0].onload = render;

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const image = images[ball.frame];
    const imageWidth = image.width;
    const imageHeight = image.height;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const scaleX = canvasWidth / imageWidth;
    const scaleY = canvasHeight / imageHeight;
    const scaleToFit = Math.max(scaleX, scaleY);
    const scaledWidth = imageWidth * scaleToFit;
    const scaledHeight = imageHeight * scaleToFit;
    const offsetX = (canvasWidth - scaledWidth) / 2;
    const offsetY = (canvasHeight - scaledHeight) / 2;
    context.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

