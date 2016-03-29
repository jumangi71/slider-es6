class Slider {
  constructor(node, options) {
    this.containerNode = document.querySelector(node);
    this.listNode = this.containerNode.querySelector('.slider-wrapper');
    this.items = this.listNode.querySelectorAll('.slider-item');
    this.arrows = {
      left: this.containerNode.querySelector('.slider-nav-left'),
      right: this.containerNode.querySelector('.slider-nav-right')
    };
    this.navigator = this.containerNode.querySelector('.slider-navigator');
    this.navigatorItems = this.containerNode.querySelectorAll('.slider-navigator-dot');

    this.page = 1;
    this.hidden = 'hidden';


    // todo: extend
    this.options = {
      animation: 'slide',
      navigator: true,
      arrows: true,
      margin: 20,
      items: 4
    };

    let itemWidth = this.containerNode.offsetWidth/this.options.items;
    let itemOffsetWidth = itemWidth + this.options.margin;
    let wrapperWidth = this.items.length * itemOffsetWidth;

    this.listNode.style.width = (wrapperWidth + (this.options.margin*2)) + 'px';

    this.pageWith = this.options.items * itemOffsetWidth;
    this.pages = Math.ceil(this.items.length/this.options.items);

    this.initArrows();

    [].forEach.call(this.items, (k, v) => {
      k.style.width = itemWidth + 'px';
      k.style.marginRight = this.options.margin + 'px';
    });

    // todo: method
    [].forEach.call(this.navigatorItems, (k, v) => {
      k.addEventListener('click', (e) => {
        e.preventDefault();
        this.goTo(v+1);
      });
    });

    // todo: доабвить кастомные события и на них вешать вне либы изменения описаний для фоток

  }

  getPageByNum(num) {
    return Math.ceil(num/this.options.items);
  }

  goTo(i) {
    this.slideToPage(this.getPageByNum(i))
  }

  slideToPage(n) {
    this.page = n;
    if (this.page >= 1) {
      let width = (this.pageWith * (this.page - 1)) * -1;
      this.listNode.style.transform = 'translate3d(' + width + 'px, 0px, 0px)';
    }
  }

  initArrows() {
    if (this.pages > 1 && this.options.arrows) {
      this.arrows.right.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.page < this.pages) {
          this.slideToPage(++this.page);
        }
      });

      this.arrows.left.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.page <= this.pages && this.page > 1) {
          this.slideToPage(--this.page);
        }
      });
    } else {
      this.arrows.right.classList.add(this.hidden);
      this.arrows.left.classList.add(this.hidden);
    }
  }



}

export default Slider;