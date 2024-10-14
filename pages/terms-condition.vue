<template>
  <div class="h-[160px] lg:h-[100px]"></div>
  <div class="h-[200px] flex items-center justify-center bg-primary">
    <h3 class="text-center text-lg sm:text-[27px] lg:text-[30px] text-white">{{ $t('terms-conditions-title') }}</h3>
  </div>
  <UIContainer>
    <p class="py-5 adjustdefault">
      {{ $t('terms-conditions.title') }}

      <br />
      <br />

      <ol class="space-y-3">
        <li>{{ $t('terms-conditions.1-title') }}
          <br> 
          {{ $t('terms-conditions.1-desk') }}
        </li>

          <li>
            {{ $t('terms-conditions.2-title') }}
          <br> 
            <div v-html="$t('terms-conditions.2-desk')"></div>
          </li>

          <li>
            {{ $t('terms-conditions.3-title') }}
          <br> 
            {{ $t('terms-conditions.3-desk') }}
          </li>

          <li>
              {{ $t('terms-conditions.4-title') }}
          <br> 
            {{ $t('terms-conditions.4-desk') }}
          </li>

          <li>
            {{ $t('terms-conditions.5-title') }}
          <br> 
            {{ $t('terms-conditions.5-desk') }}
          </li>

          <li>
            
            {{ $t('terms-conditions.6-title') }}
          <br> 

            {{ $t('terms-conditions.6-desk') }}
          </li>

          
          <li>
             {{ $t('terms-conditions.7-title') }}
          <br> 
            {{ $t('terms-conditions.7-desk') }}
          </li>

          <li>
            {{ $t('terms-conditions.8-title') }}
          <br> 
            {{ $t('terms-conditions.8-desk') }}
          </li>
      </ol>
    </p>
  </UIContainer>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

useHead({
  title: "Terms and condition",
  meta: [
    {
      name: "description",
      content: "Terms and condition",
    },
  ],
});
</script>

<style scoped>
:deep(.adjustdefault) ul,
:deep(.adjustdefault) ol {
  list-style: revert;
  margin-left: 20px;
}

:deep(.adjustdefault) h1,
:deep(.adjustdefault) h2,
:deep(.adjustdefault) h3,
:deep(.adjustdefault) h4,
:deep(.adjustdefault) h5,
:deep(.adjustdefault) h6 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(.adjustdefault) h1 {
  font-size: 2.5rem; /* Base size */
}
:deep(.adjustdefault) h2 {
  font-size: 2rem;
}
:deep(.adjustdefault) h3 {
  font-size: 1.75rem;
}
:deep(.adjustdefault) h4 {
  font-size: 1.5rem;
}
:deep(.adjustdefault) h5 {
  font-size: 1.25rem;
}
:deep(.adjustdefault) h6 {
  font-size: 1rem;
}

/* Responsive adjustments using media queries */
@media (max-width: 1200px) {
  :deep(.adjustdefault) h1 {
    font-size: 2.25rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.875rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1.625rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 1.375rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 1.125rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.875rem;
  }
}

@media (max-width: 992px) {
  :deep(.adjustdefault) h1 {
    font-size: 2rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.75rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1.5rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 1.25rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 1rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.75rem;
  }
}

@media (max-width: 768px) {
  :deep(.adjustdefault) h1 {
    font-size: 1.75rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.5rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1.25rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 1rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 0.875rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.75rem;
  }
}

@media (max-width: 576px) {
  :deep(.adjustdefault) h1 {
    font-size: 1.5rem;
  }
  :deep(.adjustdefault) h2 {
    font-size: 1.25rem;
  }
  :deep(.adjustdefault) h3 {
    font-size: 1rem;
  }
  :deep(.adjustdefault) h4 {
    font-size: 0.875rem;
  }
  :deep(.adjustdefault) h5 {
    font-size: 0.75rem;
  }
  :deep(.adjustdefault) h6 {
    font-size: 0.625rem;
  }
}
</style>