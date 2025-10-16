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
// function deleteItem(){
//     if(confirm("정말 삭제하시겠습니까?")){
//         // 실제 삭제 처리 로직
//         alert("삭제되었습니다.");
//     }
// }

function closeNotice(button) {
    const notice = button.closest(".msg_cat_tooltip");
    const noticeTxt = button.closest(".msg_cat_tooltip p");
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

// 탭 리스트
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
        const tabs = tabGroup.querySelectorAll('.btn_tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // (안전) 이벤트 버블링으로 인한 외부 리스너 간섭 방지
                e.stopPropagation();

                // ✅ 클릭된 탭이 속한 .tabs 기준으로 "바로 다음 형제 UL"만 대상
                const container = tab.closest('.tabs');
                let targetUl = null;
                if (container && container.nextElementSibling && container.nextElementSibling.tagName === 'UL') {
                    targetUl = container.nextElementSibling;
                }

                // 탭 active 상태 갱신 (해당 탭 그룹 한정)
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.dataset.tab;
                console.log(category);

                // 대상 UL이 없으면 조용히 종료 (다른 리스트 영향 X)
                if (!targetUl) return;

                // ✅ 대상 UL 내부에서만 no_data 제거
                targetUl.querySelectorAll('.no_data').forEach(el => el.remove());

                const items = targetUl.querySelectorAll('li[data-category]');
                if (items.length === 0) return;

                let anyVisible = false;

                // ✅ 대상 UL의 항목만 필터링
                items.forEach(li => {
                    if (category === 'all' || li.dataset.category === category) {
                        li.classList.remove('hidden');
                        anyVisible = true;
                    } else {
                        li.classList.add('hidden');
                    }
                });

                // ✅ 대상 UL에만 "리스트가 없습니다." 표시
                if (!anyVisible && !targetUl.querySelector('.no_data')) {
                    const li = document.createElement('li');
                    li.className = 'no_data';
                    li.textContent = '리스트가 없습니다.';
                    targetUl.appendChild(li);
                }
            });
        });
    });
});


function swalConfirmPopup(title) {
	Swal.fire({
		title: title,
		showCloseButton: true,
		customClass: {
			popup: 'pop_confirm',
			confirmButton: "btn_common primary",
		},
		confirmButtonText: "확인"
	});
}

function initSelectTag(selector = '[data-max]') {
  document.querySelectorAll(selector).forEach(select => {
    const maxCount = parseInt(select.dataset.max) || Infinity;

    // select 상위 inp_box 안에서 태그 리스트 선택
    const container = select.closest('.inp_box');
    if (!container) return;

    const tagList = container.querySelector('.tags');
    if (!tagList) return;
    
    // hidden input 생성 또는 찾기
    let hiddenInput = select.parentNode.querySelector(`input[type="hidden"][name="${select.name}"]`);
    if (!hiddenInput) {
      hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = select.name;
      select.parentNode.appendChild(hiddenInput);
    }

    // 선택된 값 저장용
    const selectedValues = {};
    let counter = 0;

    const updateHidden = () => {
      const values = Object.values(selectedValues).filter(v => v !== '');
      hiddenInput.value = values.join(',');
    };

    // select 값 선택 시 태그 생성
    select.addEventListener('change', (e) => {
      const value = e.target.value;
      if (!value) return;

      const currentCount = Object.values(selectedValues).filter(v => v !== '').length;

      if (currentCount >= maxCount) {
        swalConfirmPopup(`최대 ${maxCount}개까지 선택 가능합니다.`);
        select.value = '';
        return;
      }

      if (Object.values(selectedValues).includes(value)) {
        swalConfirmPopup('이미 선택된 값입니다.');
        select.value = '';
        return;
      }

      const span = document.createElement('span');
      span.classList.add('tag');
      span.innerHTML = `${value} <span class='btn_del' data-idx='${counter}'>×</span>`;
      tagList.appendChild(span);

      selectedValues[counter] = value;
      counter++;

      updateHidden();
      select.value = '';
    });

    // 삭제 기능
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn_del')) {
        const idx = e.target.dataset.idx;
        selectedValues[idx] = '';
        e.target.parentElement.remove();
        updateHidden();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
    initSelectTag(); // 기본 선택자 사용
});