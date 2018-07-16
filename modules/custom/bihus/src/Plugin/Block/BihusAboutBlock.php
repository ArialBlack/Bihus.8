<?php

namespace Drupal\bihus\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'About us block' block.
 *
 * @Block(
 *   id = "aboutus_block",
 *   admin_label = @Translation("About us block")
 * )
 */
class BihusAboutBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $markup = '<a href="/about" title="про нас" id="about-us-banner"><img class="img-responsive" src="/sites/default/files/2017-02/aboutus-1.png" /><span>Про нас</span></a>';
    $markup = $markup . '<div class="side-social"><div class="twitter_button"><a class="twitter-follow-button" href="https://twitter.com/BihusInfo" data-size="large" data-show-count="false">Follow @BihusInfo</a></div>';
    $markup = $markup . '<div><div class="g-ytsubscribe" data-channel="nashigroshiTV" data-layout="default" data-count="default"></div></div>';
    $markup = $markup . '<div><div class="fb-page" data-href="https://www.facebook.com/bihus.info/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/bihus.info/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/bihus.info/">BIHUS.info</a></blockquote></div></div></div>';

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
    );
  }

}
