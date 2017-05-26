<?php

namespace Drupal\bihus\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'BihusRelatedTopics block' block.
 *
 * @Block(
 *   id = "sociallinks_block",
 *   admin_label = @Translation("Social links block")
 * )
 */
class BihusSocialLinksBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $markup = '<ul><li><a href="https://www.facebook.com/bihus.info/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>';
    $markup = $markup . '<li><a href="https://twitter.com/BihusInfo" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>';
    $markup = $markup . '<li><a href="https://www.youtube.com/user/nashigroshiTV" target="_blank"><i class="fa fa-youtube-play" aria-hidden="true"></i></a></li>';
    $markup = $markup . '<li><a href="/follow-bihus"><i class="fa fa-vk" aria-hidden="true"></i></a></li>';
    $markup = $markup . '<li><a href="https://t.me/bihusinfo" target="_blank"><i class="fa fa-telegram" aria-hidden="true"></i></a></li>';
    $markup = $markup . '<li><a href="https://bihus.info/news/rss.xml target="_blank"><i class="fa fa-rss" aria-hidden="true"></i></a></li>';

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
    );
  }

}
