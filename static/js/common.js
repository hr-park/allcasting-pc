document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.inp_txt').forEach(input => {
        input.addEventListener('input', () => {
            const inpField = input.closest('.inp_field');
            const errorMessage = inpField ? inpField.querySelector('.msg_error') : null;
    
            if (errorMessage) {
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                }
                if (window.getComputedStyle(errorMessage).display !== 'none') {
                    errorMessage.style.display = 'none';
                }
            }
        });
    });
});

//select init
function resetSelectBox() {
    const selectContainers = document.querySelectorAll('.sel_box');

    selectContainers.forEach(selectContainer => {
        const selectElmnt = selectContainer.querySelector('select');
        const selectSelected = selectContainer.querySelector('.select-selected');
        const selectItems = selectContainer.querySelector('.select-items');

        selectElmnt.selectedIndex = 0;
        selectSelected.classList.remove('has_value');
        selectItems.classList.remove('same-as-selected');

        const sameAsSelectedItems = selectItems.querySelectorAll('.same-as-selected');
        sameAsSelectedItems.forEach(item => {
            item.classList.remove('same-as-selected');
        });

        selectSelected.innerHTML = selectElmnt.options[selectElmnt.selectedIndex].innerHTML;
    });
}

function openPop(popName) {
    document.querySelectorAll(`#${popName}`).forEach(pop => {
        pop.style.visibility = 'visible';
        pop.classList.add('active');
    });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closePop(popName) {
    document.querySelectorAll(`#${popName}`).forEach(pop => {
        pop.style.visibility = 'hidden';
        pop.classList.remove('active');
    });
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

function showNotification(message) {
    const layerNoti = document.querySelector('#layerNoti');
    if (!layerNoti) {
        document.querySelector('.content').insertAdjacentHTML('beforeend', `<div class="layer_noti" id="layerNoti">${message}</div>`);
        setTimeout(function(){
            const updatedLayerNoti = document.querySelector('#layerNoti');
            if (updatedLayerNoti) {
                updatedLayerNoti.remove();
            }
        }, 1000);
    }
}

//리스트 삭제
function deleteListItem(){
    if (event.target.classList.contains('btn_del')) {
        const listItem = event.target.closest('li');
        if (listItem) {
            Swal.fire({
                title: "삭제하시겠습니까?",
                customClass: {
                    popup: 'pop_confirm only_tit' //confirm창에 pop_confirm 클래스 추가
                },
                html:"",
                reverseButtons : true,
                showCancelButton: true,
                showDenyButton: false,
                cancelButtonText: "취소",
                confirmButtonText: "삭제"
            }).then((result) => {
                if (result.isConfirmed) {
                    //showNotification('');
                    listItem.remove();
                }
            });
        }
    }
}

//button active toggleclass
function toggleActiveClass(button) {
    button.classList.toggle('active');
}

//chkNumber
function chkNumber(target, num){
    target.value = num > 0 
    ? target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3').replace(/-{1,2}$/, '')
    : target.value.replace(/[^0-9]/g, '');
};

//deleteItem
function deleteItem(){
    if(confirm("정말 삭제하시겠습니까?")){
        // 실제 삭제 처리 로직
        alert("삭제되었습니다.");
    }
}

function closeNotice(button) {
    const notice = button.closest(".msg_notice_hover");
    const noticeTxt = button.closest(".msg_notice_hover p");
    if (notice) {
        noticeTxt.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Banner Swiper
    const bannerSwipers = document.querySelectorAll('.banner_swiper');
    if(bannerSwipers){
        bannerSwipers.forEach((swiperElement, index) => {
            const swiperInstance = new Swiper(swiperElement, {
                effect: 'slide',
                speed: 600,
                spaceBetween: 0,
                loop: true,
                slidesPerView: 1,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: swiperElement.querySelector('.swiper-pagination'),
                    clickable: true,
                },
            });
        });
    }
});

// 팝업 열기
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            popup.classList.add('active');
        }, 10);
    }
}

// 팝업 닫기
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

// ESC 키로 팝업 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activePopup = document.querySelector('.popup_overlay.active');
        if (activePopup) {
            closePopup(activePopup.id);
        }
    }
});

// 배경 클릭으로 팝업 닫기
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup_overlay')) {
        closePopup(e.target.id);
    }
});