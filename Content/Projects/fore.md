<div class="iphone-x" >
  <video ref="autoplayVideo" width="370" height="806" onclick="this.play()" loop muted>
    <source src="https://s3.amazonaws.com/hal.codes/fore.mp4" type="video/mp4" />
  </video>
</div>
<!-- <img src="/images/videoFrame.png" alt="Quartz Objects" srcset="/images/videoFrame.png 1x, /images/videoFrame@2x.png 2x"> -->
<div class="post-text">

## Fore Rewrite

I'm currently rewriting [Fore](http://fore.photos) from scratch.

Fore is a smart portait editor that uses algorithms to blur the background of portrait photos. I've always loved photos with [shallow depth of field](https://en.wikipedia.org/wiki/Bokeh), and Fore was an attempt to bring this effect to iPhone photos. I started work on it before Apple announced Portrait Mode, so it didn't take advantage of depth data from dual camera phones.

Version 2.0 will fully embrace depth data, and keep support for photos without it. More info to come!

<!-- Photos with no depth data are run through a custom [deep neural network](https://www.mathworks.com/help/vision/ug/semantic-segmentation-basics.html) that automatically finds the background of the photo.  -->

</div>