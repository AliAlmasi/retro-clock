class Clock {

    constructor() {
        this.target = document.getElementById('clock');

        this.hours1 = false;
        this.hours2 = false;
        this.minutes1 = false;
        this.minutes2 = false;
        this.seconds1 = false;
        this.seconds2 = false;

        this.prepareHTML();
        this.start();
    }

    prepareHTML() {
        let toCreate = [ 'hours', 'minutes', 'seconds' ];

        toCreate.forEach(anElement=>{
            let anElementName = 'wrap-' + anElement;
            let anHtmlElement = this.create('div', anElementName);
            for(let i=1;i<3;i++) {
                let wrap = this.create('div', 'wrap-number-' + i);
                anHtmlElement.appendChild(wrap);
            }
            this.target.appendChild( anHtmlElement );
            let target = document.querySelector('.' + anElementName);
            for(let i=1;i<3;i++) {
                this[anElement + 'html' + i] = target.querySelector('.wrap-number-' + i);
            }
        });

        let legendToCreate = [ 'Hrs', 'Mins', 'Secs' ];
        let wrapLegends = this.create('div', 'wrap-legends');

        legendToCreate.forEach(aLegend=>{
            let element = this.create('div', aLegend.toLowerCase());
            element.innerHTML = aLegend;
            wrapLegends.appendChild(element);
        });

        this.target.after( wrapLegends );

    }

    create(tag, className) {
        let element = document.createElement(tag);
        element.classList.add(className);
        return element;
    }

    start() {
        this.updateTime();
        this.interval = setInterval(()=>{
            this.updateTime();
        },1000);
    }

    updateTime() {
        let hours = new Date().getHours().toString().padStart(2,'0');
        let minutes = new Date().getMinutes().toString().padStart(2,'0');
        let seconds = new Date().getSeconds().toString().padStart(2,'0');
        let hours1 = hours.charAt(0);
        let hours2 = hours.charAt(1);
        let minutes1 = minutes.charAt(0);
        let minutes2 = minutes.charAt(1);
        let seconds1 = seconds.charAt(0);
        let seconds2 = seconds.charAt(1);

        this.hours1 !== hours1 ? this.update('hours', 1, hours1) : null;
        this.hours2 !== hours2 ? this.update('hours', 2, hours2) : null;

        this.minutes1 !== minutes1 ? this.update('minutes', 1, minutes1) : null;
        this.minutes2 !== minutes2 ? this.update('minutes', 2, minutes2) : null;

        this.seconds1 !== seconds1 ? this.update('seconds', 1, seconds1) : null;
        this.seconds2 !== seconds2 ? this.update('seconds', 2, seconds2) : null;
    }

    update(type, nb, value) {
        this[type+nb] = value;
        this.updateClock(type, nb, value);
    }

    updateClock(type, nb, value) {
        type = type + 'html' + nb;
        let target = this[type];
        let wrapBottom = this.create('div', 'wrap-bottom');
        let wrapTop = this.create('div', 'wrap-top');
        let topBefore = this.create('div', 'top-before');
        let topAfter = this.create('div', 'top-after');
        let bottomAfter = this.create('div', 'bottom-after');
        let bottomBefore = this.create('div', 'bottom-before');
        let beforeValue = value==0 ? 9 : value-1;
        topBefore.innerText = beforeValue;
        bottomBefore.innerText = beforeValue;
        bottomAfter.innerText = value;
        topAfter.innerText = value;
        target.innerHTML = '';
        wrapBottom.appendChild(bottomBefore);
        wrapBottom.appendChild(bottomAfter);
        wrapTop.appendChild(topBefore);
        wrapTop.appendChild(topAfter);
        target.appendChild(wrapTop);
        target.appendChild(wrapBottom);
    }
}


new Clock();
