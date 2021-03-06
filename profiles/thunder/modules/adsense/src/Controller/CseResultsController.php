<?php

/**
 * @file
 * Contains \Drupal\adsense\Controller\CseResultsController.
 */

namespace Drupal\adsense\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class CseResultsController.
 */
class CseResultsController extends ControllerBase {

  /**
   * Display the search results page.
   *
   * @return array
   *   Markup for the page with the search results.
   */
  public function display() {
    $config = \Drupal::config('adsense.settings');
    $width = $config->get('adsense_cse_frame_width');
    $country = $config->get('adsense_cse_country');

    if ($config->get('adsense_test_mode')) {
      $content = [
        '#theme' => 'adsense_ad',
        '#content' => ['#markup' => nl2br("Results\nwidth = $width\ncountry = $country")],
        '#classes' => ['adsense-placeholder'],
        '#width' => $width,
        '#height' => 100,
      ];
    }
    else {
      // Log the search keys.
      \Drupal::logger('AdSense CSE')->notice('Search keywords: %keyword', [
        '%keyword' => urldecode($_GET['as_q']),
      ]);

      $content = [
        '#theme' => 'adsense_cse_results',
        '#width' => $width,
        '#country' => $country,
      ];
    }
    return $content;
  }

}
