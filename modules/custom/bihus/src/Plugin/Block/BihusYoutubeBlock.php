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
    $markup = '<div class="g-ytsubscribe" data-channel="nashigroshiTV" data-layout="full" data-count="default" data-onytevent="onYtEvent"></div>';

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
    );
  }

}
