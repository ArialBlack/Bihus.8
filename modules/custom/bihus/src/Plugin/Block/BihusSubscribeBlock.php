<?php

namespace Drupal\bihus\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'BihusSubscribe block' block.
 *
 * @Block(
 *   id = "bihussubscribe_block",
 *   admin_label = @Translation("Subscribe block")
 * )
 */
class BihusSubscribeBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $markup = '<iframe frameborder="0" src="https://secure.esputnik.com.ua/1N61sGclQ8s" width=100% height="109" scrolling="no"></iframe>';

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
    );
  }

}
