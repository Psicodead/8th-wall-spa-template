import { XRHandJoint } from "three"

export default class AllyUI {
	constructor() {
		this.sectionIndex = 0
        this.sectionClasses = ['landing','loading-screen','scan','email-caption','win-screen','lose-screen','already-try','outro']
        this.sections = []
        this.activeSection = null
		this.isMobile = false

        this.startButton = null;
        this.termsConditionsButton = null;
        this.emailForm = null;
        this.submitButton = null; //TEMP DEBUG
        this.checkAge = null;
        this.closeTCButton = null;
        this.showClaimButton = null;
        this.showDonateButton = null;
        this.confirmClaimButton = null;
        this.confirmDonateButton = null;
        this.continueButton = null;
        this.findOutMore = null;
        this.startQuizz = null;


        this.ui = document.getElementById('main-ui')
        this.ui.addEventListener('scanned',()=>{
            //console.log('SCANNED!')
            // this.nextSection(3);
        })
		this.mobileUI = document.getElementById('mobile_main')
		window.addEventListener('resize', () => this.resize())

		this.score = null
		this.username = null
		this.scores = []

		//this.resize()
		this.init()
	}

    resize() {
		this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
		this.ui.setAttribute('class', this.isMobile ? 'mobile' : 'desktop')


		if(this.iOS){
		  if (this.isMobile && window.innerWidth > window.innerHeight) {
			//document.getElementById('mobile_landscape').style.display = 'block'
  		} else {
  			//document.getElementById('mobile_landscape').style.display = 'none'
  		}
		}else{
		  if (this.isMobile && window.innerWidth > window.innerHeight+160) {
  			//document.getElementById('mobile_landscape').style.display = 'block'
  		} else {
  			//document.getElementById('mobile_landscape').style.display = 'none'
  		}
		}
	}

    init() {
        this.video = document.getElementById('player');
        this.termsConditions = document.querySelector('.terms-conditions');
        this.startButton = document.getElementById('start-btn');
        this.termsConditionsButton = document.getElementById('open-tc');
        this.emailForm = document.getElementById('email-form');
        this.submitEmailButton = document.getElementById('email-button'); //TEMP DEBUG
        this.closeTCButton = document.getElementById('close-tc');
        this.checkAge = document.getElementById('rules-checkbox')
        this.showClaimButton = document.getElementById('claim-prize-tab');
        this.showDonateButton = document.getElementById('donate-prize-tab');
        this.claimPanel = document.getElementById('claim-prize-panel');
        this.donatePanel = document.getElementById('donate-prize-panel');
        this.confirmClaimButton = document.getElementById('confirm-claim');
        this.confirmDonateButton = document.getElementById('confirm-donate');
        // this.continueButton = document.getElementById('');
        // this.findOutMore = document.getElementById('');
        // this.startQuizz = document.getElementById('');

        this.initEvents();

        // create all the DOM sections
        this.sectionClasses.forEach((sect) =>{
            const el = document.querySelector(`.${sect}`)
            this.sections.push(el)
        })

        this.setActiveSection(0);

    }
    initEvents(){

        //PLACE HOLDER ===== SHOULD BE CALL ON SCRIPT WITH XR.
        this.setStartButton(()=>{
            //this.setActiveSection(3);
        })

        this.termsConditionsButton.addEventListener('click',()=>{
            this.showTerms(true);
        })

        this.closeTCButton.addEventListener('click',()=>{
            this.showTerms(false);
        })

        this.emailForm.addEventListener('submit',()=>{
        //     $.ajax({
        //         type: 'post',
        //         url: 'myPageName.php',
        //         data: $('#myFormName').serialize(),
        //         success: function () {
        //          alert("Email has been sent!");
        //         }
        //       });
        //   e.preventDefault();
            // this.setActiveSection(0);
            this.video.play();
            this.nextSection();
        })

        this.checkAge.addEventListener('change',()=>{
            if(this.checkAge.checked){
                this.submitEmailButton.disabled = false;
            }else{
                this.submitEmailButton.disabled = true;
            }
            console.log(this.checkAge.checked);
        })
        this.submitEmailButton.addEventListener('click',()=>{
           // this.nextSection();
        })

        this.showClaimButton.addEventListener('click',()=>{
            this.claimPanel.hidden=false;
            this.donatePanel.hidden=true;
            this.showClaimButton.classList.remove('unselected');
            this.showDonateButton.classList.add('unselected');
            this.showClaimButton.setAttribute("aria-selected", true);
            this.showDonateButton.setAttribute("aria-selected", false);
        })
        this.showDonateButton.addEventListener('click',()=>{
            this.claimPanel.hidden=true;
            this.donatePanel.hidden=false;
            this.showClaimButton.classList.add('unselected');
            this.showDonateButton.classList.remove('unselected');
            this.showClaimButton.setAttribute("aria-selected", false);
            this.showDonateButton.setAttribute("aria-selected", true);
        })

        this.confirmDonateButton.addEventListener('click',()=>{
            this.nextSection();
        })
        this.confirmClaimButton.addEventListener('click',()=>{
            this.nextSection();
        })

        this.handleVideoEnds();
    }

    setActiveSection(index) {
        index = typeof index === 'number'?index: this.getIndexByName(index);
        this.sectionIndex = index;
        this.activeSection = this.sections[this.sectionIndex];
        this.updateSection();
    }

    getIndexByName(index){
        return this.sectionClasses.indexOf(index);
    }

    handleVideoEnds(){
        this.video.addEventListener('ended',()=>{
            this.setActiveSection('email-caption');
            this.ui.style.background = "black";
            this.video.src='/videos/yippee_01.mp4';
            this.video.load();
            try{
                XR8.pause();
            }catch(error){
                console.log("couldn't catch", error);
            }
        })
    }
    nextSection(){
        setTimeout(()=>{
            this.setActiveSection(this.sectionIndex + 1);
        },1000)
    }
    previousSection(){
        this.setActiveSection(this.sectionIndex - 1);
    }
    // getActiveSection(){
    //     return this.sections[this.sectionIndex];
    // }

    hideSections() {
		// var sections = document.getElementsByClassName('sections')

        this.sections.forEach((el)=>{
            if(el !== this.activeSection){
                el.classList.add('hidden');
            }
        })

	}

    updateSection() {
		this.hideSections()
		console.log(this.activeSection)
		if (this.activeSection !== null) {
			this.activeSection.classList.remove('hidden');
            this.activeSection.focus();
			console.log('set section to ' + this.sectionClasses[this.sectionIndex]);
		}
	}

    setStartButton(cb){
        this.startButton.addEventListener('click',()=>{
            cb();
        })
    }

    showTerms(show){
        if(show){
            this.termsConditions.classList.add('show');
        }else{
            this.termsConditions.classList.remove('show');
        }
    }

    showAddressForm() {

    }

    playAnimation(cb) {
        // do somethinng and then call callback
		cb()
	}
}