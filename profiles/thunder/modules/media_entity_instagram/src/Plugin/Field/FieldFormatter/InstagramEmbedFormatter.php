<?php

namespace Drupal\media_entity_instagram\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\media_entity\EmbedCodeValueTrait;
use Drupal\media_entity_instagram\Plugin\MediaEntity\Type\Instagram;

/**
 * Plugin implementation of the 'instagram_embed' formatter.
 *
 * @FieldFormatter(
 *   id = "instagram_embed",
 *   label = @Translation("Instagram embed"),
 *   field_types = {
 *     "link", "string", "string_long"
 *   }
 * )
 */
class InstagramEmbedFormatter extends FormatterBase {

  use EmbedCodeValueTrait;

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = array();
    $settings = $this->getSettings();
    foreach ($items as $delta => $item) {
      $matches = [];
      foreach (Instagram::$validationRegexp as $pattern => $key) {
        if (preg_match($pattern, $this->getEmbedCode($item), $matches)) {
          break;
        }
      }

      if (!empty($matches['shortcode'])) {
        $element[$delta] = [
          '#type' => 'html_tag',
          '#tag' => 'iframe',
          '#attributes' => [
            'allowtransparency' => 'true',
            'frameborder' => 0,
            'position' => 'absolute',
            'scrolling' => 'no',
            'src' => '//instagram.com/p/' . $matches['shortcode'] . '/embed/',
          ],
        ];

        if (!isset($settings['width']) || !isset($settings['height'])) {
          $element[$delta]['#attached']['library'][] = 'media_entity_instagram/integration';
        }

        if (isset($settings['width'])) {
          $element[$delta]['#attributes']['width'] = $settings['width'];
        }

        if (isset($settings['height'])) {
          $element[$delta]['#attributes']['height'] = $settings['height'];
        }
      }
    }

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return array(
      'width' => NULL,
      'height' => NULL,
    ) + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);

    $elements['width'] = array(
      '#type' => 'number',
      '#title' => $this->t('Width'),
      '#default_value' => $this->getSetting('width'),
      '#min' => 1,
      '#description' => $this->t('Width of instagram. Leave empty for responsive embed.'),
    );

    $elements['height'] = array(
      '#type' => 'number',
      '#title' => $this->t('Height'),
      '#default_value' => $this->getSetting('height'),
      '#min' => 1,
      '#description' => $this->t('Height of instagram. Leave empty for responsive embed.'),
    );

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $settings = $this->getSettings();
    if (!isset($settings['width']) || !isset($settings['height'])) {
      return [$this->t('Responsive size.')];
    }
    else {
      return [
        $this->t('Width: @width px', ['@width' => $settings['width']]),
        $this->t('Height: @height px', ['@height' => $settings['height']]),
      ];
    }
  }

}
