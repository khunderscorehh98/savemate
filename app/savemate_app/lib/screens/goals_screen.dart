import 'package:flutter/material.dart';

class GoalsScreen extends StatelessWidget {
  const GoalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Goals')),
      body: const Center(
        child: Text(
          'Your financial goals will appear here.',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
