class NavigationMenu{
	constructor(container){
		this.menuList = Array.from(container.querySelectorAll('.tab'))
		this.menuContent = Array.from(container.querySelectorAll('.tab__content'))

		this.selectItem();
	}

	searchSelected(){
		return this.menuList.findIndex(item => item.classList.contains('tab_active'));
	}

	selectItem(){
		this.menuList.forEach((item, index)  => item.addEventListener('click', () =>{	
			const temp = this.searchSelected();
			this.menuList[temp].classList.remove('tab_active');
			this.menuContent[temp].classList.remove('tab__content_active');

			item.classList.add('tab_active');
			this.menuContent[index].classList.add('tab__content_active');
		})
		)
	}

}
const nav = new NavigationMenu(document.getElementById('tabs1'))