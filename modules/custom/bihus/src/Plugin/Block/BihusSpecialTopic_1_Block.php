<?php

namespace Drupal\bihus\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\image\Entity\ImageStyle;
use Drupal\file\Entity;
use Drupal\Core\Entity\EntityInterface;

/**
 * Provides a 'BihusTopic1 block' block.
 *
 * @Block(
 *   id = "specialtopic1_block",
 *   admin_label = @Translation("Special Topic 1 block")
 * )
 */
class BihusSpecialTopic_1_Block extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    return 0;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $markup = '';

    $query1 = \Drupal::database()->select('node__field_topic', 't');
    $query1->fields('t', ['field_topic_target_id']);
    $query1->orderBy('t.entity_id', 'DESC');
    $tids1 = $query1->execute()->fetchCol();
    $utids1 = array_unique($tids1);
    if(($key1 = array_search("23", $utids1)) !== false) { // Ми вплинули не надо, спасибо, уже есть сбоку
      unset($utids1[$key1]);
    }
    $tid = array_shift(array_slice($utids1, 0, 1));

    if ($tid) {
      $tnquery = \Drupal::database()->select('taxonomy_term_field_data', 'd');
      $tnquery->fields('d', ['name']);
      $tnquery->condition('d.tid', $tid);
      $term_name = $tnquery->execute()->fetchField();

      $tquery = \Drupal::database()->select('taxonomy_index', 'i');
      $tquery->fields('i', ['nid']);
      $tquery->condition('i.tid', $tid);
      $tquery->orderBy('i.created', 'DESC');
      $tquery->range(0, 2);
      $tresults = $tquery->execute()->fetchAll();

      $markup = $markup . '<h2 class="block-title"><a title="Ще по темі" href="/taxonomy/term/' . $tid . '">СПЕЦТЕМА: "'. $term_name . '"</a></h2>';
      $markup = $markup . '<div class="view-content">';

      $nc = count($tresults);

      if($nc > 0) {
        $entity_type = 'node';
        $view_mode = 'teaser';

        for($j = 0; $j < $nc; $j++) {
          $related_nid = $tresults[$j]->nid;

          $view_builder = \Drupal::entityTypeManager()->getViewBuilder($entity_type);
          $storage = \Drupal::entityTypeManager()->getStorage($entity_type);
          $node = $storage->load($related_nid);

          $markup = $markup . '<div class="views-row">';

            $markup = $markup . render($node->field_teaser_media->view('teaser'));

            $markup = $markup . '<div class="views-field views-field-nothing"><span class="field-content"><div class="on-media-text">';
              $markup = $markup . render($node->field_project->view('full'));
              $markup = $markup . '<div class="node-title"><a href="/node/' .$related_nid .'">' . render($node->title->view('teaser')) . '</a></div>';
              $markup = $markup . '<div class="node-created">' . date("d.m.Y", $node->get('created')->value) . '</div></div></span></div></div>';
        }
      }

      $markup = $markup . '</div>';
    }

    return array(
        '#type' => 'markup',
        '#markup' => $markup,
        '#cache' => array(
            'max-age' => 0,
        ),
    );
  }
}




