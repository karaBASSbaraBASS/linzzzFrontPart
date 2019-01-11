
</div>
<!-- content end -->
<!-- footer -->
<footer>
    <div class="footerWrap">
        <div class="flexRow rowWrap">
            <div class="col-33 footerCol">
                {{--<h4>Linvo AG:</h4>--}}
                <a href="{{ request()->segment(1) ? '/' : '#'}}" class="footerLogo">
                    <img src="/img/logo/logo.png" alt="logo">
                </a>
                @if($contacts->addresses)
                @foreach($contacts->addresses as $address)
                <span>{{$address['string']}}</span>
                @endforeach
                @endif
            </div>
            <div class="col-33 footerCol">
                <h4>Contact us:</h4>

                @if($contacts->phones)
                @foreach($contacts->phones as $phone)
                <a href="tel:{{$phone['number']}}" class="footerLink">{{$phone['number']}}</a>
                @endforeach
                @endif
                @if($contacts->emails)
                @foreach($contacts->emails as $email)
                <a href="mailto:{{$email['address']}}" class="footerLink">{{$email['address']}}</a>
                @endforeach
                @endif
            </div>
            <div class="col-33 footerCol">
                <h4>Download:</h4>
                @if($contacts->files)
                @foreach($contacts->files as $file)
                <a href="{{$file['link']}}" class="footerLink downloadLink">
                    {{$file['name']}}
                </a>
                @endforeach
                @endif
            </div>
        </div>
    </div>
</footer>
<!-- footer end-->
</div>