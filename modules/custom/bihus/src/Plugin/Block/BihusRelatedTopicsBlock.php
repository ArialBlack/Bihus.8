<?php

namespace Drupal\bihus\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;

/**
 * Provides a 'BihusRelatedTopics block' block.
 *
 * @Block(
 *   id = "relatedtopics_block",
 *   admin_label = @Translation("Related topics block")
 * )
 */
class BihusRelatedTopicsBlock extends BlockBase {
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
    $node = \Drupal::routeMatch()->getParameter('node');
    $markup = '';

    if ($node) {
      $nid = $node->id();

      $query = \Drupal::database()->select('node__field_topic', 't');
      $query->fields('t', ['field_topic_target_id']);
      $query->condition('t.entity_id', $nid);
      $results = $query->execute()->fetchAll();

      $c = count($results);

      if($c > 0) {
        for($i = 0; $i < $c; $i++) {
          $term_id = $results[$i]->field_topic_target_id;

          $tnquery = \Drupal::database()->select('taxonomy_term_field_data', 'd');
          $tnquery->fields('d', ['name']);
          $tnquery->condition('d.tid', $term_id);
          $term_name = $tnquery->execute()->fetchField();

          $tquery = \Drupal::database()->select('taxonomy_index', 'i');
          $tquery->fields('i', ['nid']);
          $tquery->condition('i.tid', $term_id);
          $tquery->orderBy('i.created', 'DESC');
          $tquery->range(1, 4);
          $tresults = $tquery->execute()->fetchAll();

          $markup = $markup . '<h2 class="block-title">Новини по темі "'. $term_name . '"</h2>';

          $nc = count($tresults);

          if($nc > 0) {
            $entity_type = 'node';
            $view_mode = 'teaser';

            for($j = 0; $j < $nc; $j++) {
              $related_nid = $tresults[$j]->nid;

              //$related_node = \Drupal\node\Entity\Node::load($related_nid);
              $view_builder = \Drupal::entityTypeManager()->getViewBuilder($entity_type);
              $storage = \Drupal::entityTypeManager()->getStorage($entity_type);
              $node = $storage->load($related_nid);
              $build = $view_builder->view($node, $view_mode);
              $output = render($build);

              $markup = $markup . $output;
            }
          }

          $markup = $markup . '<a class="more-link" href="/taxonomy/term/' . $term_id . '">Ще по темі</a>';
        }
      }

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
