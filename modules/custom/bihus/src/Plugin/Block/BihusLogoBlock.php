<?php

namespace Drupal\bihus\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'BihusRelatedTopics block' block.
 *
 * @Block(
 *   id = "logo_block",
 *   admin_label = @Translation("Logo block")
 * )
 */
class BihusLogoBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $markup = '<a class="logo navbar-btn pull-left" href="/" title="На головну" rel="home"><img src="/themes/bihus8/images/logo.svg" alt="Home"></a>';

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
    );
  }
}
