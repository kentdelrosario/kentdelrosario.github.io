$(document).ready(function () {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', $('.active-song').attr('data-src'));
    audioElement.volume = 0.5; // Set volume

    var tl = new TimelineMax();
    tl.to('.player__albumImg', 3, {
        rotation: '360deg',
        repeat: -1,
        ease: Power0.easeNone
    }, '-=0.2');
    tl.pause();

    // Play audio when the play button is clicked
    $('.player__play').click(function () {
        if ($('.player').hasClass('play')) {
            $('.player').removeClass('play');
            audioElement.pause();
            TweenMax.to('.player__albumImg', 0.2, {
                scale: 1,
                ease: Power0.easeNone
            });
            tl.pause();
        } else {
            $('.player').addClass('play');
            audioElement.play();
            TweenMax.to('.player__albumImg', 0.2, {
                scale: 1.1,
                ease: Power0.easeNone
            });
            tl.resume();
        }
    });

    // Start audio when the video is played
    // var myVideo = document.getElementById('myVideo');
    // myVideo.addEventListener('play', function () {
    //     if (!$('.player').hasClass('play')) {
    //         $('.player').addClass('play');
    //         audioElement.play();
    //         TweenMax.to('.player__albumImg', 0.2, {
    //             scale: 1.1,
    //             ease: Power0.easeNone
    //         });
    //         tl.resume();
    //     }
    // });

    // Optional: Pause audio when the video is paused
    // myVideo.addEventListener('pause', function () {
    //     audioElement.pause();
    //     $('.player').removeClass('play');
    //     TweenMax.to('.player__albumImg', 0.2, {
    //         scale: 1,
    //         ease: Power0.easeNone
    //     });
    //     tl.pause();
    // });

    var playhead = document.getElementById("playhead");
    audioElement.addEventListener("timeupdate", function () {
        var duration = this.duration;
        var currentTime = this.currentTime;
        var percentage = (currentTime / duration) * 100;
        playhead.style.width = percentage + '%';
    });

    function updateInfo() {
        $('.player__author').text($('.active-song').attr('data-author'));
        $('.player__song').text($('.active-song').attr('data-song'));
    }
    updateInfo();

    function playNextSong() {
        if ($('.player .player__albumImg.active-song').is(':last-child')) {
            $('.player__albumImg.active-song').removeClass('active-song');
            $('.player .player__albumImg:first-child').addClass('active-song');
        } else {
            $('.player__albumImg.active-song').removeClass('active-song').next().addClass('active-song');
        }
        updateInfo();
        audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        audioElement.play();
    }

    audioElement.addEventListener('ended', playNextSong);

    $('.player__next').click(function () {
        playNextSong();
    });

    $('.player__prev').click(function () {
        if ($('.player .player__albumImg.active-song').is(':first-child')) {
            $('.player__albumImg.active-song').removeClass('active-song');
            $('.player .player__albumImg:last-child').addClass('active-song');
        } else {
            $('.player__albumImg.active-song').removeClass('active-song').prev().addClass('active-song');
        }
        updateInfo();
        audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        audioElement.play();
    });
});
