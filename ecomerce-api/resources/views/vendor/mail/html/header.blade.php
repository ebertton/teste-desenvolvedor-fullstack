<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="{{ url('/') . '/storage/img/logo.svg' }}" class="logo" alt="Aquarius logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
