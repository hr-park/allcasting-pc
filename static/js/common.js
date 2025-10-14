/*document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.inp_txt').forEach(input => {
        input.addEventListener('input', () => {
            const inpField = input.closest('.inp_field');
            const errorMessage = inpField ? inpField.querySelector('.msg_desc') : null;
    
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
*/


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

/*
document.querySelectorAll('.tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.btn_tab');
    const ul = tabGroup.nextElementSibling?.matches('ul')
      ? tabGroup.nextElementSibling
      : tabGroup.parentElement.querySelector('ul');
    const categoryElements = list ? ul.querySelectorAll('li[data-category]') : [];
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // 탭 active 상태 갱신
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
  
        const category = tab.dataset.tab;
  
        // li[data-category] 필터링
        categoryElements.forEach(el => {
          if (category === 'all' || el.dataset.category === category) {
            el.classList.remove('hidden');
          } else {
            el.classList.add('hidden');
          }
        });
      });
    });
  });
  */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
	const tabs = tabGroup.querySelectorAll('.btn_tab');
	const ul = tabGroup.nextElementSibling?.matches('ul')
		? tabGroup.nextElementSibling
		: tabGroup.parentElement.querySelector('ul');
	const categoryElements = ul ? ul.querySelectorAll('li[data-category]') : [];

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
            // 페이지 로드 시 기존 .no_data 제거
            const noDataElements = document.querySelectorAll('.no_data');
            noDataElements.forEach(el => el.remove());
            
			// 탭 active 상태 갱신
			tabs.forEach(t => t.classList.remove('active'));
			tab.classList.add('active');

			const category = tab.dataset.tab;
            console.log(category)

			if (categoryElements.length > 0) {
				// li[data-category] 필터링
				let anyVisible = false;
				categoryElements.forEach(el => {
					if (category === 'all' || el.dataset.category === category) {
						el.classList.remove('hidden');
						anyVisible = true;
					} else {
						el.classList.add('hidden');
					}
				});

				// 리스트에 해당 항목이 없으면 no_items 표시
				if (!anyVisible) {
					if (!ul.querySelector('.no_items')) {
						const li = document.createElement('li');
						li.className = 'no_data';
						li.textContent = '데이터가 없습니다.';
						ul.appendChild(li);
					}
				} else {
					const noItems = ul.querySelector('.no_items');
					if (noItems) noItems.remove();
				}
			}/* else {
				if (!tabGroup.parentElement.querySelector('.no_items')) {
					const wrapper = document.createElement('div');
					wrapper.className = 'no_data';
					wrapper.textContent = '등록된 프로젝트가 없습니다.';
					tabGroup.parentElement.appendChild(wrapper);
				}
			}*/
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

// 선택자 기반으로 초기화
// document.querySelectorAll('.form-control').forEach(element => {
//   new Choices(element, {
//     classNames: {
//       containerOuter: ['choiceschoiceschoices']
//     }
//   });
// });


// document.addEventListener('DOMContentLoaded', () => {

//     const commonClass = ['choiceschoiceschoices'];

//     const choices = new Choices(element, {
//         classNames: {
//         containerOuter: ['choiceschoiceschoices'],
//         containerInner: ['choices__inner'],
//         input: ['choices__input'],
//         inputCloned: ['choices__input--cloned'],
//         list: ['choices__list'],
//         listItems: ['choices__list--multiple'],
//         listSingle: ['choices__list--single'],
//         listDropdown: ['choices__list--dropdown'],
//         item: ['choices__item'],
//         itemSelectable: ['choices__item--selectable'],
//         itemDisabled: ['choices__item--disabled'],
//         itemChoice: ['choices__item--choice'],
//         description: ['choices__description'],
//         placeholder: ['choices__placeholder'],
//         group: ['choices__group'],
//         groupHeading: ['choices__heading'],
//         button: ['choices__button'],
//         activeState: ['is-active'],
//         focusState: ['is-focused'],
//         openState: ['is-open'],
//         disabledState: ['is-disabled'],
//         highlightedState: ['is-highlighted'],
//         selectedState: ['is-selected'],
//         flippedState: ['is-flipped'],
//         loadingState: ['is-loading'],
//         invalidState: ['is-invalid'],
//         notice: ['choices__notice'],
//         addChoice: ['choices__item--selectable', 'add-choice'],
//         noResults: ['has-no-results'],
//         noChoices: ['has-no-choices'],
        
//         },
//     });
// });




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