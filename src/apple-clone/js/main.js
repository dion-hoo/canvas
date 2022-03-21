"use strict";

(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentScene = 0;
  let enterNewScene = false;
  let acc = 0.1;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  const sceneInfo = [
    {
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight높이 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],

        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],

        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageC_translateY_in: [20, 0, { start: 0.6, end: 0.6 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],

        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      type: "normal",
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight높이 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        messageA: document.querySelector("#scroll-section-2 .main-message.a"),
        messageB: document.querySelector("#scroll-section-2 .desc-message.b"),
        messageC: document.querySelector("#scroll-section-2 .desc-message.c"),
        pinB: document.querySelector("#scroll-section-2 .desc-message.b .pin"),
        pinC: document.querySelector("#scroll-section-2 .desc-message.c .pin"),
        canvas: document.querySelector("#video-canvas-2"),
        context: document.querySelector("#video-canvas-2").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],

        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],

        messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],

        pinB_height: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_height: [0.5, 1, { start: 0.87, end: 0.92 }],
      },
    },
    {
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight높이 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        canvasCaption: document.querySelector(".canvas-caption"),
        canvas: document.querySelector(".imgage-blend-canvas"),
        context: document
          .querySelector(".imgage-blend-canvas")
          .getContext("2d"),
        imagesPath: ["../images/test-img.jpg", "../images/blend-image-2.jpg"],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
        rectStartY: 0,
      },
    },
  ];

  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = `../video/001/IMG_${6726 + i}.JPG`;

      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = new Image();
      imgElem2.src = `../video/002/IMG_${7027 + i}.JPG`;

      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    let imgElem3;
    for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[3].objs.imagesPath[i];

      sceneInfo[3].objs.images.push(imgElem3);
    }
  }

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = sceneInfo[
          i
        ].objs.container.getBoundingClientRect().height;
      }
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    const height = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${height})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${height})`;
  }

  function calcValues(values, currentYOffset) {
    let rv;
    let scrollHeight = sceneInfo[currentScene].scrollHeight;
    let scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * values[1];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        // let sequence = Math.round(
        //   calcValues(values.imageSequence, currentYOffset)
        // );

        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(
          values.canvas_opacity,
          currentYOffset
        );

        let messageA_opacity_in = calcValues(
          values.messageA_opacity_in,
          currentYOffset
        );
        let messageA_opacity_out = calcValues(
          values.messageA_opacity_out,
          currentYOffset
        );
        let messageA_translateY_in = calcValues(
          values.messageA_translateY_in,
          currentYOffset
        );
        let messageA_translateY_out = calcValues(
          values.messageA_translateY_out,
          currentYOffset
        );

        let messageB_opacity_in = calcValues(
          values.messageB_opacity_in,
          currentYOffset
        );

        let messageB_opacity_out = calcValues(
          values.messageB_opacity_out,
          currentYOffset
        );

        let messageB_translateY_in = calcValues(
          values.messageB_translateY_in,
          currentYOffset
        );

        let messageB_translateY_out = calcValues(
          values.messageB_translateY_out,
          currentYOffset
        );

        let messageC_opacity_in = calcValues(
          values.messageC_opacity_in,
          currentYOffset
        );

        let messageC_opacity_out = calcValues(
          values.messageC_opacity_out,
          currentYOffset
        );

        let messageC_translateY_in = calcValues(
          values.messageC_translateY_in,
          currentYOffset
        );

        let messageC_translateY_out = calcValues(
          values.messageC_translateY_out,
          currentYOffset
        );

        let messageD_opacity_in = calcValues(
          values.messageD_opacity_in,
          currentYOffset
        );

        let messageD_opacity_out = calcValues(
          values.messageD_opacity_out,
          currentYOffset
        );

        let messageD_translateY_in = calcValues(
          values.messageD_translateY_in,
          currentYOffset
        );

        let messageD_translateY_out = calcValues(
          values.messageD_translateY_out,
          currentYOffset
        );

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translate3D(0, ${messageA_translateY_in}%, 0)`;
        } else {
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translate3D(0, ${messageA_translateY_out}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          objs.messageB.style.opacity = messageB_opacity_in;
          objs.messageB.style.transform = `translate3D(0, ${messageB_translateY_in}%, 0)`;
        } else {
          objs.messageB.style.opacity = messageB_opacity_out;
          objs.messageB.style.transform = `translate3D(0, ${messageB_translateY_out}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          objs.messageC.style.opacity = messageC_opacity_in;
          objs.messageC.style.transform = `translate3D(0, ${messageC_translateY_in}%, 0)`;
        } else {
          objs.messageC.style.opacity = messageC_opacity_out;
          objs.messageC.style.transform = `translate3D(0, ${messageC_translateY_out}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          objs.messageD.style.opacity = messageD_opacity_in;
          objs.messageD.style.transform = `translate3D(0, ${messageD_translateY_in}%, 0)`;
        } else {
          objs.messageD.style.opacity = messageD_opacity_out;
          objs.messageD.style.transform = `translate3D(0, ${messageD_translateY_out}%, 0)`;
        }

        break;
      case 1:
        break;
      case 2:
        // let sequence2 = Math.round(
        //   calcValues(values.imageSequence, currentYOffset)
        // );

        // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        let messageA_opacity_in2 = calcValues(
          values.messageA_opacity_in,
          currentYOffset
        );
        let messageA_opacity_out2 = calcValues(
          values.messageA_opacity_out,
          currentYOffset
        );
        let messageA_translateY_in2 = calcValues(
          values.messageA_translateY_in,
          currentYOffset
        );
        let messageA_translateY_out2 = calcValues(
          values.messageA_translateY_out,
          currentYOffset
        );

        let messageB_opacity_in2 = calcValues(
          values.messageB_opacity_in,
          currentYOffset
        );

        let messageB_opacity_out2 = calcValues(
          values.messageB_opacity_out,
          currentYOffset
        );

        let messageB_translateY_in2 = calcValues(
          values.messageB_translateY_in,
          currentYOffset
        );

        let messageB_translateY_out2 = calcValues(
          values.messageB_translateY_out,
          currentYOffset
        );

        let messageC_opacity_in2 = calcValues(
          values.messageC_opacity_in,
          currentYOffset
        );

        let messageC_opacity_out2 = calcValues(
          values.messageC_opacity_out,
          currentYOffset
        );

        let messageC_translateY_in2 = calcValues(
          values.messageC_translateY_in,
          currentYOffset
        );

        let messageC_translateY_out2 = calcValues(
          values.messageC_translateY_out,
          currentYOffset
        );

        let pinB_height = calcValues(values.pinB_height, currentYOffset);
        let pinC_height = calcValues(values.pinC_height, currentYOffset);

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = messageA_opacity_in2;
          objs.messageA.style.transform = `translate3D(0, ${messageA_translateY_in2}%, 0)`;
        } else {
          objs.messageA.style.opacity = messageA_opacity_out2;
          objs.messageA.style.transform = `translate3D(0, ${messageA_translateY_out2}%, 0)`;
        }

        if (scrollRatio <= 0.66) {
          objs.messageB.style.opacity = messageB_opacity_in2;
          objs.messageB.style.transform = `translate3D(0, ${messageB_translateY_in2}%, 0)`;
        } else {
          objs.messageB.style.opacity = messageB_opacity_out2;
          objs.messageB.style.transform = `translate3D(0, ${messageB_translateY_out2}%, 0)`;
        }

        if (scrollRatio <= 0.94) {
          objs.messageC.style.opacity = messageC_opacity_in2;
          objs.messageC.style.transform = `translate3D(0, ${messageC_translateY_in2}%, 0)`;
        } else {
          objs.messageC.style.opacity = messageC_opacity_out2;
          objs.messageC.style.transform = `translate3D(0, ${messageC_translateY_out2}%, 0)`;
        }

        objs.pinB.style.transform = `scale(${pinB_height})`;
        objs.pinC.style.transform = `scale(${pinC_height})`;

        /** 3번 캔버스 미리 그리기 */
        if (scrollRatio > 0.9) {
          const { objs, values } = sceneInfo[3];
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;
          if (widthRatio <= heightRatio) {
            canvasScaleRatio = heightRatio;
          } else {
            canvasScaleRatio = widthRatio;
          }
          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.drawImage(objs.images[0], 0, 0);
          objs.context.fillStyle = "#fff";

          const recalculatedInnerWidth =
            document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
          objs.context.fillRect(
            values.rect1X[0],
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
          objs.context.fillRect(
            values.rect2X[0],
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
        }

        break;
      case 3:
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
        } else {
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.drawImage(objs.images[0], 0, 0);
        objs.context.fillStyle = "#fff";

        // width height 둘중에 큰값의 비율에 맞춘 크기에 해당하는 너비 or 높이를 브라우저 크기 비율에 맞춘다. 캔버스의 px 값을 얻는다
        const recalculatedInnerWidth =
          document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        // 흰색 박스 크기와 애니메이션 좌표
        const whiteRectWidth = recalculatedInnerWidth * 0.15;

        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] =
          values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 박스가 사라지는 시점을 정한다
        if (!values.rectStartY) {
          const innerHeight = window.innerHeight / 2;

          // values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rectStartY =
            (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2 +
            objs.canvas.offsetTop;

          console.log(objs.canvas.height * canvasScaleRatio);

          values.rect1X[2].start = innerHeight / scrollHeight;
          values.rect2X[2].start = innerHeight / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );

        if (scrollRatio < values.rect1X[2].end) {
          objs.canvas.classList.remove("sticky");
        } else {
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;

          const blendHeight = calcValues(values.blendHeight, currentYOffset);

          objs.context.drawImage(
            objs.images[1],
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight,
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight
          );

          objs.canvas.classList.add("sticky");
          objs.canvas.style.top = `-${
            (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2
          }px`;
          objs.canvas.style.marginTop = 0;

          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] =
              document.body.offsetWidth / (objs.canvas.width * 1.5);

            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

            let scale = calcValues(values.canvas_scale, currentYOffset);

            objs.canvas.style.transform = `scale(${scale})`;
          }

          if (
            scrollRatio > values.canvas_scale[2].end &&
            values.canvas_scale[2].end > 0
          ) {
            objs.canvas.classList.remove("sticky");
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opacity[2].end =
              values.canvasCaption_opacity[2].start + 0.1;

            values.canvasCaption_translateY[2].start =
              values.canvas_scale[2].end;
            values.canvasCaption_translateY[2].end =
              values.canvasCaption_translateY[2].start + 0.1;

            objs.canvasCaption.style.opacity = calcValues(
              values.canvasCaption_opacity,
              currentYOffset
            );

            objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(
              values.canvasCaption_translateY,
              currentYOffset
            )}%, 0)`;
          } else {
            objs.canvasCaption.style.opacity = 0;
          }
        }

        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    enterNewScene = false;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    // scroll down
    if (
      delayedYOffset >
      prevScrollHeight + sceneInfo[currentScene].scrollHeight
    ) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    //scroll up
    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      if (yOffset < 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;
    playAnimation();
  }

  function loop() {
    delayedYOffset += (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      if (currentScene === 0 || currentScene === 2) {
        const values = sceneInfo[currentScene].values;
        const objs = sceneInfo[currentScene].objs;
        let sequence = Math.round(
          calcValues(values.imageSequence, delayedYOffset - prevScrollHeight)
        );

        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }
      }
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener("load", () => {
    let tempScrollCount = 0;

    setLayout();
    document.body.classList.remove("before-load");

    if (window.pageYOffset > 0) {
      let stopCount = setInterval(() => {
        window.scrollTo(0, window.pageYOffset);
        window.pageYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(stopCount);
        }
        tempScrollCount++;
      }, 20);
    }

    document
      .querySelector(".loading")
      .addEventListener("transitionend", (e) => {
        document.body.removeChild(e.currentTarget);
      });

    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;

      scrollLoop();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);

        rafState = true;
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        setLayout();

        sceneInfo[3].values.rectStartY = 0;
      }
    });
    window.addEventListener("orientationchange", setLayout);
  });

  window.addEventListener("reload", () => {
    alert(1);
  });

  setCanvasImages();
})();
