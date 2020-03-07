const body = document.querySelector('body'),
      header = document.querySelector('.header'),
      burgerMenu = header.querySelector('.menu-burger__icon'),
      menuItems = document.querySelector('.nav-menu'),
      logo = header.querySelector('.logo img'),
      slider = document.querySelector('.slider-block'),
      sliderContents = slider.querySelector('.slider__contents'),
      arrowLeft = slider.querySelector('.arrow-left'),
      arrowRight = slider.querySelector('.arrow-right'),
      yearBtns = document.querySelectorAll('.year'),
      welshBtns = slider.querySelectorAll('.welsh'),
      allSliderText = slider.querySelectorAll('.slider-text'),
      numOfPage = slider.querySelector('.num-of-page');

let scrollPageY = 0,
    allSliderPage = 5,
    sliderPageWidth = slider.clientWidth,
    indexOfPage = 1,
    translatePage = 0,
    hideText = false;

const srcImg = {
    logoWhite: './assets/img/LOGO.png',
    logoBlack: './assets/img/logo2.png'
}
const isActive = (el, className) => el.classList.contains(className);

const scroll = () => {
    scrollPageY = window.pageYOffset;

    if(scrollPageY > 0){
        header.classList.add('header_bg');
        logo.setAttribute('src', srcImg.logoBlack)
    }else{
        if(!isActive(burgerMenu, 'active')){
            header.classList.remove('header_bg');
            logo.setAttribute('src', srcImg.logoWhite)
        }
    };
}
const onClickBurgerMenu = () => {
    if(isActive(burgerMenu, 'active')){
        burgerMenu.classList.remove('active');
        menuItems.classList.remove('active');
        if(isActive(header, 'header_bg') && scrollPageY === 0){
            header.classList.remove('header_bg');
            logo.setAttribute('src', srcImg.logoWhite);
        }
    }else {
        burgerMenu.classList.add('active');
        menuItems.classList.add('active');
        if(!isActive(header, 'header_bg') && scrollPageY === 0){
            header.classList.add('header_bg');
            logo.setAttribute('src', srcImg.logoBlack)
        }
    }
}
const isDisabled = (el, num, className) => {
    if(indexOfPage === num) {
        el.classList.add(className);
    }else el.classList.remove(className);
}
const transformSlider = (offset, arrowControll, index) => {
    arrowControll.classList.remove('disable');
    sliderContents.style.transform = `translateX(${offset}px)`;
    numOfPage.textContent = `${index} из ${allSliderPage}`;
}

const rightControllOfSlider = () => {
    if(indexOfPage !== allSliderPage){
        indexOfPage++;
        translatePage -= sliderPageWidth;
        isDisabled(arrowRight, allSliderPage, 'disable');
        transformSlider(translatePage, arrowLeft, indexOfPage);
    }
}
const leftControllOfSlider = () => {
    if(indexOfPage !== 1){
        indexOfPage--;
        translatePage += sliderPageWidth;
        isDisabled(arrowLeft, 1, 'disable');
        transformSlider(translatePage, arrowRight, indexOfPage);
    }
}

const deleteActiveClass = elArr => {
    elArr.forEach(item => item.classList.remove('active'));
}
const getSizeForSlider = () => {
    sliderPageWidth = slider.clientWidth;
    sliderContents.style.width = `${sliderPageWidth * allSliderPage}px`;
    if(indexOfPage !== 1){
        translatePage = -sliderPageWidth * (indexOfPage - 1);
    }else translatePage = 0;
    sliderContents.style.transform = `translateX(${translatePage}px)`;
    if(sliderPageWidth > 768) {
        hideText = false;
        allSliderText.forEach(item => {
            item.classList.remove('hide-text');
        });
        welshBtns.forEach(btn => {
            btn.textContent = 'Скрыть';
        })
    }
}
yearBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        let thisEl = e.target;
        if(!thisEl.classList.contains('active')){
            deleteActiveClass(yearBtns);
            thisEl.classList.add('active');
        }
    });
});
welshBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        if(!hideText){
            allSliderText.forEach(item => {
                item.classList.add('hide-text');
            });
            hideText = true;
        }else {
            allSliderText.forEach(item => {
                item.classList.remove('hide-text');
                hideText = false;
            });
        }
        if(hideText){
            btn.textContent = 'Открыть';
        }else btn.textContent = 'Скрыть';
    });
    
});
sliderContents.style.width = `${sliderPageWidth * allSliderPage}px`;
window.addEventListener('scroll', scroll);
window.addEventListener('resize', getSizeForSlider);
burgerMenu.addEventListener('click', onClickBurgerMenu);
arrowLeft.addEventListener('click', leftControllOfSlider);
arrowRight.addEventListener('click', rightControllOfSlider);