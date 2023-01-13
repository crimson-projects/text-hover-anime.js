/* Minified script taken from Charming JS */

!function(e){"undefined"==typeof module?this.charming=e:module.exports=e}(function(e,n){"use strict";n=n||{};var t=n.tagName||"span",o=null!=n.classPrefix?n.classPrefix:"char",r=1,a=function(e){for(var n=e.parentNode,a=e.nodeValue,c=a.length,l=-1;++l<c;){var d=document.createElement(t);o&&(d.className=o+r,r++),d.appendChild(document.createTextNode(a[l])),n.insertBefore(d,e)}n.removeChild(e)};return function c(e){for(var n=[].slice.call(e.childNodes),t=n.length,o=-1;++o<t;)c(n[o]);e.nodeType===Node.TEXT_NODE&&a(e)}(e),e});

/* -----------End---------------------    */


{
	setTimeout(() => document.body.classList.add('render'), 60);
	const navdemos = document.querySelectorAll('nav.demos > .demo');
	Array.from(navdemos).forEach(link => link.addEventListener('click', (ev) => {
		ev.preventDefault();
		document.body.classList.remove('render');
		document.body.addEventListener('transitionend', () => window.location = ev.target.href);
	}));
}

{
	class Letter {
		constructor(letter, pos) {
			this.DOM = {};
			this.DOM.letter = letter;
			this.CONFIG = {
				trailDelay: 200
			};
			this.layout();
			this.initEvents();
		}
		layout() {
			this.DOM.letterInner = document.createElement('span');
			this.DOM.letterInner.innerHTML = this.DOM.letter.innerHTML;
			this.DOM.letterInner2 = document.createElement('span');
			this.DOM.letterInner2.innerHTML = this.DOM.letter.innerHTML;
			this.DOM.letterInner2.style.transformOrigin = '50% 100%';
			this.DOM.letter.innerHTML = '';
			this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.DOM.svg.setAttribute('width', '150px');
			this.DOM.svg.setAttribute('height', '170px');
			this.DOM.svg.setAttribute('viewBox', '0 0 150 170');
			for (let i = 0; i < 9; i++) {
				const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circle.setAttribute('cx', 75);
				circle.setAttribute('cy', 85);
				circle.setAttribute('r', 6);
				this.DOM.svg.appendChild(circle);
			};
			this.DOM.circles = Array.from(this.DOM.svg.querySelectorAll('circle'));
			this.DOM.letter.appendChild(this.DOM.svg);
			this.DOM.letter.appendChild(this.DOM.letterInner);
			this.DOM.letter.appendChild(this.DOM.letterInner2);
		}
		initEvents() {
			this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				anime.remove(this.DOM.letterInner2);
				anime({
					targets: this.DOM.letterInner2,
					duration: 1200,
					easing: 'easeOutElastic',
					elasticity: 200,
					rotateX: [0,-360]
				});

				anime.remove(this.DOM.circles);
				anime({
					targets: this.DOM.circles,
					duration: (t,i) => { return anime.random(200,600); },
					easing: [0.1,1,0.3,1],
					delay: this.CONFIG.trailDelay,
					opacity: [
						{value: [0,1], duration: 10, easing: 'linear'},
						{value: 0, duration: 400, easing: 'linear'}
					],
					translateY: (t, i, c) => {
						const radius = anime.random(30,50);
						return [0,Math.round(radius * Math.sin(2*(i+1)*Math.PI/c)) + 'px'];
					},
					translateX: (t, i, c) => {
						const radius = anime.random(30,50);
						return [0,Math.round(radius * Math.cos(2*(i+1)*Math.PI/c)) + 'px'];
					},
					scaleX: [2,0.2],
					scaleY: [2,0.2]
				});
			}, 50);

			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;
			};
			
			this.DOM.letter.addEventListener('mouseenter', this.mouseenterFn);
			this.DOM.letter.addEventListener('mouseleave', this.mouseleaveFn);
			this.DOM.letter.addEventListener('touchstart', this.mouseenterFn);
			this.DOM.letter.addEventListener('touchend', this.mouseleaveFn);
		}
	}
  
/* ******************************************** */
  
	class Word {
		constructor(word) {
			this.DOM = {};
			this.DOM.word = word;
			this.layout();
		}
		layout() {
			charming(this.DOM.word, {classPrefix: 'letter'});
			Array.from(this.DOM.word.querySelectorAll('span')).forEach((letter) => new Letter(letter));
		}
	}

	Array.from(document.querySelectorAll('.word')).forEach((word) => new Word(word));
};