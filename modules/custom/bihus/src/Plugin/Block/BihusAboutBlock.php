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
    $markup = '<a href="/about" title="про нас"><img class="img-responsive" src="/sites/default/files/2017-02/aboutus-1.png" /><span>Про нас</span></a>';
    $markup = $markup . '<div class="fb-page" data-href="https://www.facebook.com/bihus.info/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/bihus.info/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/bihus.info/">BIHUS.info</a></blockquote></div>';

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
    );
  }

}
