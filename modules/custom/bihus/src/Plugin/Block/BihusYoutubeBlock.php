<?php

namespace Drupal\bihus\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'BihusYoutube block' block.
 *
 * @Block(
 *   id = "youtube_block",
 *   admin_label = @Translation("youtube block")
 * )
 */
class BihusYoutubeBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $markup = '<div class="g-ytsubscribe" data-channel="nashigroshiTV" data-layout="default" data-count="default"></div>';

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
    );
  }

}
