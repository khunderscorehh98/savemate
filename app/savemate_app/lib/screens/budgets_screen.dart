import 'package:flutter/material.dart';

class BudgetsScreen extends StatelessWidget {
  const BudgetsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Budgets')),
      body: const Center(
        child: Text(
          'Your Budgets will appear here.',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
