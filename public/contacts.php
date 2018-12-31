<?php include 'modules/_head.php' ?>
<?php include 'modules/_header.php' ?>
<?php include 'modules/_ieStub.php' ?>
    <section class="contentPage">
        <div class="contentPageWrap lightBlock">
            <div class="flexCol">
                <div class="headingWrap">
                    <div class="headingBlock">
                        <h1>contact</h1>
                    </div>
                </div>
<!--                <span class="mainSubheading text-center col-70"></span>-->
                <div class="col-80 text-block">
                    <p>If you would like to find out more about our wealth advisory consultancy service, please do not hesitate to get in touch with us on the details below. We operate out of Switzerland, UK and Germany. A member of our team will be delighted to talk through your requirements and arrange a personal consultation.</p>
                </div>
                <form action="" class="col-80 contactFormWrap">
                    <div class="inputBlockWrap">
                        <div class="inputBlock">
                            <label>Name*</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name"
                                   class="contactForm" value=""/>
                        </div>
                        <div class="inputBlock">
                            <label>Phone*</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone"
                                   class="contactForm" value=""/>
                        </div>
                        <div class="inputBlock">
                            <label>E-mail*</label>
                            <input type="email" id="email" name="email" placeholder="Enter your e-mail"
                                   class="contactForm" value=""/>
                        </div>
                        <div class="inputBlock">
                            <label>Your message</label>
                            <textarea type="submit" rows="1" id="textMessage" name="textMessage" placeholder="Enter your message"
                                      class="contactForm" value=""></textarea>
                        </div>
                    </div>
                    <span class="legendCaption" >* - points are required</span>
                    <div class="sendBtnWrap">
                        <div class="sendBtnCol">
                            <button onclick="validateSubscribeForm(form)" type="button" class="submitFormBtn">
                                contact us
                            </button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    </section>
    <div class="popup sucsessModal">
        <!--    <div class="shadow"></div>-->
        <div class="mailMsg Sucsess">
            Thank you!<br/> Message suxesfully sended...
        </div>
        <!--    <div class="mailMsg Error">-->
        <!--        Сталася помилка.-->
        <!--    </div>-->
    </div>
<?php include 'modules/_footer.php' ?>
<?php include 'modules/_footerScripts.php' ?>